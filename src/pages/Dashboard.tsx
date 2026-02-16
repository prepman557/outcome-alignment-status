import { Link } from "react-router-dom";
import { Account, getAlignmentStatus, isExpansionReady } from "@/lib/accounts";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Building2, ArrowRight, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Dashboard({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-lg font-semibold">No Accounts Yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Add accounts to start tracking outcome alignment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const expansionCount = accounts.filter(isExpansionReady).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-sm text-muted-foreground">Track outcome alignment across your portfolio.</p>
        </div>
        {expansionCount > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
            <TrendingUp className="h-3.5 w-3.5" />
            {expansionCount} expansion {expansionCount === 1 ? "opportunity" : "opportunities"}
          </div>
        )}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Renewal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expansion</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => {
              const status = getAlignmentStatus(account);
              const hasExpansion = isExpansionReady(account);
              return (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.companyName}</TableCell>
                  <TableCell className="text-muted-foreground">{account.industry}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(account.renewalDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell>
                    {hasExpansion ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            <TrendingUp className="h-3 w-3" />
                            {account.expansion.type} · {account.expansion.stage}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{account.expansion.estimatedValue} — {account.expansion.trigger}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/account/${account.id}`}
                      className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
