import { MailIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Label } from "./Label";
import { cx } from "@/lib/utils";

interface ISubscribeError {
  firstName?: string;
  email?: string;

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
  });
  const [errors, setErrors] = useState<ISubscribeError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    email: false,
  });

  const validateName = (
    name: string,
    fieldName: string
  ): string | undefined => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 4 characters`;
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

    if (firstNameError) newErrors.firstName = firstNameError;
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      firstName: true,
      email: true,
    });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup attempt:", formData);
      // Handle successful signup here
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="contai ner mx-auto px-20 sm:px-8 py-10 bg-white dark:bg-neutral-900 dark:text-white sm:max-w-[620px] ">
        <div className="mb-2 flex flex-col gap-2">
          <div className="mb-2 flex items-center justify-center">
            <Image
              src="/images/mail-icon.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <DialogHeader className="items-start">
            <DialogTitle className="text-4xl sm:text-start dark:text-white">
              Secure Your Spot Today
            </DialogTitle>
            <DialogDescription className="sm:text-start dark:text-gray-400">
              Join the waitlist and be among the first to experience the app
              that will transform your spiritual journey.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          
            <div className="flex flex-col gap-2 mt-2 ">
              <Label htmlFor="firstName">First name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  className={cx(
                    "pl-10",
                    "h-12",
                    errors.firstName &&
                      touched.firstName &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  aria-invalid={
                    errors.firstName && touched.firstName ? "true" : "false"
                  }
                  aria-describedby={
                    errors.firstName && touched.firstName
                      ? "firstName-error"
                      : undefined
                  }
                />
              </div>

              {errors.firstName && touched.firstName && (
                <p
                  id="firstName-error"
                  className="text-sm min-h-[20px] text-destructive mt-1"
                  role="alert"
                >
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                id="dialog-subscribe"
                placeholder="hi@yourcompany.com"
                type="email"
                aria-label="Email"
                className={cx(
                  "pl-10",
                  "h-12",
                  "peer ps-9 dark:bg-gray-800 dark:text-white dark:border-gray-700",
                  errors.firstName &&
                    touched.firstName &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                aria-invalid={
                  errors.firstName && touched.firstName ? "true" : "false"
                }
                aria-describedby={
                  errors.firstName && touched.firstName
                    ? "firstName-error"
                    : undefined
                }
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 dark:text-gray-400">
                <MailIcon size={16} aria-hidden="true" />
              </div>
            </div>

            <div className="flex items-start gap-2">
  <Checkbox id="privacy" />
  <Label htmlFor="privacy" className="text-xs text-muted-foreground">
    By subscribing you agree to our{" "}
    <a href="#" className="underline hover:no-underline text-primary">
      Privacy Policy
    </a>
    .
  </Label>
</div>


          
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={cx(
              "pl-10",
              "h-12",
              "w-full dark:bg-teal-400 dark:text-gray-900 dark:hover:bg-teal-300",
              errors.email &&
                touched.email &&
                "border-destructive focus-visible:ring-destructive"
            )}
            aria-invalid={
              errors.email && touched.email ? "true" : "false"
            }
            aria-describedby={
              errors.email && touched.email
                ? "firstName-error"
                : undefined
            }
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </Button>
        </form>

      
      </DialogContent>
    </Dialog>
  );
}
