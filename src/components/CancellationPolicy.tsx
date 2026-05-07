import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, XCircle, CreditCard, Lock, Info } from "lucide-react";

export const CancellationPolicy = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Free cancellation up to 7 days before travel</p>
            <p className="text-xs text-muted-foreground">View full cancellation & refund policy</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t bg-muted/20 animate-fade-in">
          <p className="text-xs text-muted-foreground mt-3 mb-4">
            Trippinity's cancellation policy is designed to be fair to both travelers and operators. All times are in IST.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Cancellation Policy</p>
            {[
              { icon: ShieldCheck, color: "text-success bg-success/10", label: "More than 30 days before departure", refund: "100% refund", tag: "Full refund", tagColor: "bg-success/15 text-success" },
              { icon: ShieldCheck, color: "text-success bg-success/10", label: "15 – 30 days before departure", refund: "75% refund of total amount", tag: "Partial refund", tagColor: "bg-success/15 text-success" },
              { icon: AlertTriangle, color: "text-secondary bg-secondary/10", label: "7 – 14 days before departure", refund: "50% refund of total amount", tag: "Half refund", tagColor: "bg-secondary/15 text-secondary-foreground" },
              { icon: AlertTriangle, color: "text-orange-500 bg-orange-50", label: "3 – 7 days before departure", refund: "25% refund of total amount", tag: "Minimal refund", tagColor: "bg-orange-50 text-orange-600" },
              { icon: XCircle, color: "text-destructive bg-destructive/10", label: "Less than 3 days / No-show", refund: "No refund", tag: "Non-refundable", tagColor: "bg-destructive/10 text-destructive" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 p-3 rounded-xl bg-background border">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${row.color}`}>
                  <row.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.refund}</p>
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold whitespace-nowrap ${row.tagColor}`}>
                  {row.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-background border text-xs text-muted-foreground">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p>
              Cancellations must be requested via Trippinity platform. Refunds are processed within 5–7 business days to the original payment method. Date changes are treated as cancellations and rebookings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const PaymentPolicy = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Pay 50% now · Balance 7 days before travel</p>
            <p className="text-xs text-muted-foreground">View full payment & security policy</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t bg-muted/20 animate-fade-in">
          <p className="text-xs text-muted-foreground mt-3 mb-4">
            Trippinity uses a split-payment system to protect both travelers and operators.
          </p>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">How payments work</p>
            {[
              { step: "1", title: "Book with 50% deposit", desc: "Lock your spot instantly by paying just half the trip price. Your booking is confirmed immediately.", color: "bg-primary text-white" },
              { step: "2", title: "Balance due 7 days before travel", desc: "Pay the remaining 50% automatically via your saved payment method, or manually from your profile.", color: "bg-primary text-white" },
              { step: "3", title: "Secure escrow protection", desc: "Your payment is held securely. The operator receives funds only after the trip departs.", color: "bg-success text-white" },
            ].map((row) => (
              <div key={row.step} className="flex items-start gap-3 p-3 rounded-xl bg-background border">
                <div className={`w-8 h-8 rounded-lg ${row.color} flex items-center justify-center font-extrabold text-sm shrink-0`}>
                  {row.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{row.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { icon: Lock, label: "SSL secured", sub: "256-bit encryption" },
              { icon: ShieldCheck, label: "Fraud protected", sub: "Razorpay gateway" },
              { icon: CreditCard, label: "All cards accepted", sub: "Visa, MC, RuPay" },
            ].map((b) => (
              <div key={b.label} className="p-3 rounded-xl bg-background border text-center">
                <b.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <p className="text-[11px] font-bold">{b.label}</p>
                <p className="text-[10px] text-muted-foreground">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
