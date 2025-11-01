
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Briefcase, Rocket } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;
      await updateUserFn({ ...values, industry: formattedIndustry });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("🎉 Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-gray-900 text-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="relative overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 shadow-2xl rounded-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(88,28,135,0.25),_transparent_60%)] pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="text-purple-400 w-6 h-6" />
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Personalize your experience with AI-powered career insights.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Industry */}
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="industry" className="text-gray-200">
                  Industry
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("industry", value);
                    setSelectedIndustry(
                      industries.find((ind) => ind.id === value)
                    );
                    setValue("subIndustry", "");
                  }}
                >
                  <SelectTrigger id="industry" className="bg-gray-800 border-gray-700 focus:ring-purple-500">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-gray-100 border-gray-700">
                    <SelectGroup>
                      <SelectLabel>Industries</SelectLabel>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500">{errors.industry.message}</p>
                )}
              </motion.div>

              {/* SubIndustry */}
              <AnimatePresence>
                {watchIndustry && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="subIndustry" className="text-gray-200">
                      Specialization
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("subIndustry", value)}
                    >
                      <SelectTrigger id="subIndustry" className="bg-gray-800 border-gray-700 focus:ring-purple-500">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 text-gray-100 border-gray-700">
                        <SelectGroup>
                          <SelectLabel>Specializations</SelectLabel>
                          {selectedIndustry?.subIndustries.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                      <p className="text-sm text-red-500">
                        {errors.subIndustry.message}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Experience */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="experience" className="text-gray-200">
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="Enter years of experience"
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-purple-500"
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">{errors.experience.message}</p>
                )}
              </motion.div>

              {/* Skills */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="skills" className="text-gray-200">
                  Skills
                </Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Node.js, AI, Leadership"
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-purple-500"
                  {...register("skills")}
                />
                <p className="text-sm text-gray-500">
                  Separate multiple skills with commas
                </p>
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills.message}</p>
                )}
              </motion.div>

              {/* Bio */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label htmlFor="bio" className="text-gray-200">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your professional journey..."
                  className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 h-32 focus:ring-purple-500"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving your profile...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-5 w-5" />
                      Complete Profile
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
