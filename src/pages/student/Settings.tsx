import { useState } from "react";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function StudentSettings() {
  const { toast } = useToast();
  const [name, setName] = useState("Juan dela Cruz");

  return (
    <StudentShell>
      <PageHeader title="Profile settings" description="Update your information and exam preferences." />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-display">Personal information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">JC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change photo</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jdelacruz@dssc.edu.ph" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Short bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
                </div>
              </div>
              <Button onClick={() => toast({ title: "Profile saved", description: "Your changes have been updated." })}>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-display">Academic profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select defaultValue="bsed">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsed">BSEd - Secondary Education</SelectItem>
                      <SelectItem value="beed">BEEd - Elementary Education</SelectItem>
                      <SelectItem value="bped">BPEd - Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Select defaultValue="english">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="filipino">Filipino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year level</Label>
                  <Select defaultValue="4">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((year) => (
                        <SelectItem key={year} value={String(year)}>{year}th year</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target LET date</Label>
                  <Input type="date" defaultValue="2025-09-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-display">Exam preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default difficulty</Label>
                <Select defaultValue="medium">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium (recommended)</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">Adaptive difficulty will adjust each question based on your performance.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StudentShell>
  );
}
