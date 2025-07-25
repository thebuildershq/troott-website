import { MailIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Label } from "./Label";
import { cx } from "@/lib/utils";
import { toast } from "sonner";



interface ISubscribeError {
  firstName?: string;
  email?: string;
  agree?: string;
}
interface ISubscribeDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function Newsletter(data: ISubscribeDialog) {
  
  const { open, onOpenChange } = data;
  

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    agree: false,
  });
  
  const [errors, setErrors] = useState<ISubscribeError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    email: false,
  });

   const validateName = (name: string, fieldName: string): string | undefined => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ISubscribeError = {};

    const firstNameError = validateName(formData.firstName, "First Name");
    const emailError = validateEmail(formData.email);
    if (!formData.agree) newErrors.agree = "You must accept the privacy policy";

    if (firstNameError) newErrors.firstName = firstNameError;
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur = (field: keyof typeof formData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    const newErrors = { ...errors };
    if (field === "firstName") {
      const firstNameError = validateName(formData.firstName, "First Name");
      if (firstNameError) newErrors.firstName = firstNameError;
    } else if (field === "email") {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }

    setErrors(newErrors);
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({ ...prev, agree: !prev.agree }));
    if (errors.agree) setErrors((prev) => ({ ...prev, agree: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      email: true,
    });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, name: formData.firstName, consent: formData.agree ? "yes" : "no" }),
      });

      const data = await res.json();
      console.log('Subscription request data:', data)

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("You're on the list!", {
        description: "We'll let you know when the app is ready.",
      });

      // Optionally close modal
      onOpenChange(false);

      // Optionally reset form
      setFormData({ firstName: "", email: "", agree: false });
      setTouched({ firstName: false, email: false });

      console.log("Subscribed successfully");
    } catch (err) {
      console.error("Subscription failed:", err);
      if (err instanceof Error && err.message === "This email is already subscribed") {
        toast.error(err.message);
      } else {
        toast.error(err instanceof Error ? err.message : "Subscription failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="container mx-auto sm:px-8 py-10 bg-white dark:bg-neutral-900 dark:text-white sm:max-w-[500px] items-start justify-start border border-neutral-900">
        <div className="mb-2 flex flex-col gap-2">
          <div className="mb-2 flex items-center justify-center">
            <Image
              src="/images/mail-icon.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <DialogHeader className="items-start justify-start">
            <DialogTitle className="text-4xl sm:text-start dark:text-white">
              Secure Your Spot Today
            </DialogTitle>
            <DialogDescription className="sm:text-start dark:text-neutral-400">
              Join the waitlist and be among the first to experience the app
              that will transform your spiritual journey.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="flex flex-col gap-2 mt-1 ">
            <div className="relative ">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/80  dark:text-neutral-400" />
              <Input
                id="firstName"
                type="text"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                onBlur={handleBlur("firstName")}
                className={cx(
                  "pl-10 h-12 border text-muted-foreground", // base thin border
                  "focus:border-teal-400 dark:focus:border-teal-400 focus:outline-none",
                  "dark:border-neutral-700 dark:text-neutral-300",
                  errors.firstName &&
                    touched.firstName &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
            </div>

            {errors.firstName && touched.firstName && (
              <p id="firstName-error" className="text-sm text-red-400 mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-neutral-400" />
            <Input
              id="email"
              type="email"
              placeholder="your email"
              value={formData.email}
              onChange={handleInputChange("email")}
              onBlur={handleBlur("email")}
              className={cx(
                "pl-10 h-12 border text-neutral-600",
                "focus:border-teal-400 dark:focus:border-teal-400 focus:outline-none",
                "dark:border-neutral-700 dark:text-neutral-300",
                errors.email && touched.email && "border-destructive"
              )}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && touched.email && (
              <p id="email-error" className="text-sm text-red-400 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start gap-2 text-neutral-400">
            <Checkbox id="privacy" checked={formData.agree} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="privacy" className="text-xs dark:text-neutral-400">
              By subscribing you agree to our{" "}
              <a href="#" className="  text-neutral-300/80">
                Privacy Policy
              </a>
              .
            </Label>
          </div>

          <Button
            type="button"
             disabled={ !formData.firstName || !formData.email || !formData.agree || isSubmitting }
            onClick={handleSubmit}
            className={cx(
              "pl-10 h-12 disabled:opacity-50 disabled:cursor-not-allowed",
              "w-full dark:bg-teal-400 dark:text-neutral-900 dark:hover:bg-teal-300",
              errors.email &&
                touched.email &&
                "border-destructive focus-visible:ring-destructive"
            )}
            aria-invalid={errors.email && touched.email ? "true" : "false"}
            aria-describedby={
              errors.email && touched.email ? "firstName-error" : undefined
            }
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
