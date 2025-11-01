  "use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
// Remove this line: import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  // Update the generatePDF function to use dynamic import
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import html2pdf only when needed
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };
  return (
    <div data-color-mode="light" className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 border border-border/50 shadow-lg">
          <div className="space-y-2">
            <h1 className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Builder
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Craft your professional story with AI assistance
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="flex-1 md:flex-none relative overflow-hidden group border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" />
                  <span className="relative z-10">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2 relative z-10" />
                  <span className="relative z-10">Save Resume</span>
                </>
              )}
            </Button>
            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className="flex-1 md:flex-none bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 p-1 bg-muted/50 rounded-xl border border-border/50">
          <TabsTrigger 
            value="edit" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300"
          >
            <Edit className="h-4 w-4 mr-2" />
            Form Builder
          </TabsTrigger>
          <TabsTrigger 
            value="preview"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300"
          >
            <Monitor className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-8 mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Contact Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      Email Address
                    </label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                      className="border-border/50 focus:border-primary transition-colors duration-300 bg-background/50"
                      error={errors.contactInfo?.email}
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      Mobile Number
                    </label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="border-border/50 focus:border-primary transition-colors duration-300 bg-background/50"
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn URL
                    </label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      className="border-border/50 focus:border-primary transition-colors duration-300 bg-background/50"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.contactInfo.linkedin.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Twitter className="h-3.5 w-3.5" />
                      Twitter/X Profile
                    </label>
                    <Input
                      {...register("contactInfo.twitter")}
                      type="url"
                      placeholder="https://twitter.com/your-handle"
                      className="border-border/50 focus:border-primary transition-colors duration-300 bg-background/50"
                    />
                    {errors.contactInfo?.twitter && (
                      <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.contactInfo.twitter.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Professional Summary
                  </h3>
                </div>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 border-border/50 focus:border-primary transition-colors duration-300 bg-background/50 resize-none"
                      placeholder="Write a compelling professional summary that highlights your expertise and value..."
                      error={errors.summary}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.summary.message}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                    <Code className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Skills & Expertise
                  </h3>
                </div>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="h-32 border-border/50 focus:border-primary transition-colors duration-300 bg-background/50 resize-none"
                      placeholder="List your key technical and soft skills..."
                      error={errors.skills}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.skills.message}
                  </p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Work Experience
                  </h3>
                </div>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.experience && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Education
                  </h3>
                </div>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.education.message}
                  </p>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4 p-6 rounded-2xl bg-gradient-to-br from-background to-background/50 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20">
                    <Code className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    Projects
                  </h3>
                </div>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {errors.projects.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4 mt-6">
          {activeTab === "preview" && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border border-border/50">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                }
                className="relative overflow-hidden group border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {resumeMode === "preview" ? (
                  <>
                    <Edit className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Edit Markdown</span>
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Show Preview</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex items-start gap-3 p-4 border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 rounded-xl animate-in fade-in-0 slide-in-from-top-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Warning: Manual Edits</p>
                <p className="text-xs">
                  You will lose edited markdown if you update the form data. Consider saving your changes first.
                </p>
              </div>
            </div>
          )}
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative border-2 border-border/50 rounded-2xl overflow-hidden shadow-2xl">
              <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
              />
            </div>
          </div>
          
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}