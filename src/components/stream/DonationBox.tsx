
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface DonationBoxProps {
  onDonate: (amount: number, message: string) => void;
}

const PRESET_AMOUNTS = [5, 10, 20, 50, 100];

const DonationBox = ({ onDonate }: DonationBoxProps) => {
  const [amount, setAmount] = useState<number | string>('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    
    onDonate(donationAmount, message);
    toast.success(`Thank you for your donation of $${donationAmount.toFixed(2)}!`);
    setAmount('');
    setMessage('');
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Support the streamer</h3>
        <p className="text-muted-foreground text-sm">
          Your donation helps keep the content coming! The streamer will be notified of your support.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Donation Amount</Label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-2">
            {PRESET_AMOUNTS.map((presetAmount) => (
              <Button
                key={presetAmount}
                type="button"
                variant={amount === presetAmount ? "default" : "outline"}
                onClick={() => setAmount(presetAmount)}
                className="h-10"
              >
                ${presetAmount}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              className="pl-7"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea
            id="message"
            placeholder="Add a message to your donation"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>
        
        <Button type="submit" className="w-full">
          Send Donation
        </Button>
      </form>
    </div>
  );
};

export default DonationBox;
