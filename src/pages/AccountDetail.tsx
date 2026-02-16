import { useParams, Link } from "react-router-dom";
import { Account, getAlignmentStatus } from "@/lib/accounts";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  accounts: Account[];
  onUpdate: (account: Account) => void;
}

export default function AccountDetail({ accounts, onUpdate }: Props) {
  const { id } = useParams<{ id: string }>();
  const account = accounts.find((a) => a.id === id);

  if (!account) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Account not found.</p>
      </div>
    );
  }

  const status = getAlignmentStatus(account);

  const update = (partial: Partial<Account>) => {
    onUpdate({ ...account, ...partial });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{account.companyName}</h1>
            <p className="text-sm text-muted-foreground">
              {account.industry} · Renews{" "}
              {new Date(account.renewalDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outcome Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="outcome">Desired Outcome</Label>
              <Input
                id="outcome"
                placeholder="e.g. Reduce churn by 20%"
                value={account.desiredOutcome}
                onChange={(e) => update({ desiredOutcome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metric">Primary Success Metric</Label>
              <Input
                id="metric"
                placeholder="e.g. Net Revenue Retention"
                value={account.primaryMetric}
                onChange={(e) => update({ primaryMetric: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stakeholders & Cadence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sponsor">Executive Sponsor</Label>
              <Input
                id="sponsor"
                placeholder="e.g. Jane Smith, VP Customer Success"
                value={account.executiveSponsor}
                onChange={(e) => update({ executiveSponsor: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Review Cadence</Label>
              <Select
                value={account.reviewCadence}
                onValueChange={(val) => update({ reviewCadence: val as Account["reviewCadence"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cadence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Confidence Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">How confident are you in alignment?</span>
                <span className="font-semibold">{account.confidenceLevel} / 5</span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[account.confidenceLevel]}
                onValueChange={([val]) => update({ confidenceLevel: val })}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
