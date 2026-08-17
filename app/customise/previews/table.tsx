"use client"

import * as React from "react"
import {
  Download,
  Folder,
  MoreHorizontal,
  Phone,
  Star,
  Upload,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PreviewCard, PreviewGrid } from "./preview-card"

const organisations = [
  {
    id: "1",
    logo: "T",
    logoBg: "bg-black text-white",
    name: "Timeless",
    amount: "₹ 3,50,500",
    status: "Qualification",
    statusColor: "bg-blue-500",
    email: "stacy@example.com",
    mobile: "+91 9994445678",
    assigneeName: "Avinash Goel",
    assigneeAvatar: "https://i.pravatar.cc/40?img=12",
    assigneeFallback: "AG",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    logo: "D",
    logoBg: "bg-blue-500 text-white",
    name: "Dropbox",
    amount: "₹ 5,00,000",
    status: "Negotiation",
    statusColor: "bg-purple-500",
    email: "julie@example.com",
    mobile: "+91 7778889999",
    assigneeName: "Sara Patel",
    assigneeAvatar: "https://i.pravatar.cc/40?img=47",
    assigneeFallback: "SP",
    lastModified: "1 month ago",
  },
  {
    id: "3",
    logo: "A",
    logoBg: "bg-yellow-400 text-black",
    name: "Attentive",
    amount: "₹ 4,80,000",
    status: "Meeting",
    statusColor: "bg-orange-500",
    email: "linda@example.com",
    mobile: "+91 3332221111",
    assigneeName: "Emily Wong",
    assigneeAvatar: "https://i.pravatar.cc/40?img=44",
    assigneeFallback: "EW",
    lastModified: "2 weeks ago",
  },
]

const driveDocuments = [
  {
    id: "1",
    name: "Illustration",
    ownerName: "Aaron Stevenson",
    ownerAvatar: "https://i.pravatar.cc/40?img=13",
    ownerFallback: "AS",
    size: "47.4 MB",
    dateModified: "2 days ago",
  },
  {
    id: "2",
    name: "Photography",
    ownerName: "Jacob Collins",
    ownerAvatar: "https://i.pravatar.cc/40?img=15",
    ownerFallback: "JC",
    size: "56.2 MB",
    dateModified: "1 week ago",
  },
  {
    id: "3",
    name: "Graphic Design",
    ownerName: "Emily Parker",
    ownerAvatar: "https://i.pravatar.cc/40?img=45",
    ownerFallback: "EP",
    size: "32.8 MB",
    dateModified: "5 days ago",
  },
]

const members = [
  {
    id: "1",
    name: "Sandeep",
    email: "sandeepk@example.com",
    avatar: "https://i.pravatar.cc/40?img=12",
    fallback: "SA",
    teams: "2",
    role: "Member",
  },
  {
    id: "2",
    name: "Alice",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/40?img=44",
    fallback: "AL",
    teams: "5",
    role: "Owner",
  },
]

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
]

const products = [
  { id: "1", name: "Wireless Mouse", price: "$29.99" },
  { id: "2", name: "Mechanical Keyboard", price: "$149.99" },
  { id: "3", name: "USB-C Hub", price: "$49.99" },
]

export default function TablePreview() {
  return (
    <PreviewGrid>
      <PreviewCard label="Organisations (CRM)">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned to</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organisations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar variant="square" size="default">
                        <AvatarFallback className={org.logoBg}>
                          {org.logo}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">
                        {org.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {org.amount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${org.statusColor}`}
                      />
                      <span className="text-muted-foreground">
                        {org.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage src={org.assigneeAvatar} />
                        <AvatarFallback>{org.assigneeFallback}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">
                        {org.assigneeName}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="Drive documents">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {driveDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Folder className="size-4 fill-foreground" />
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage src={doc.ownerAvatar} />
                        <AvatarFallback>{doc.ownerFallback}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{doc.ownerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.size}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Star className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Upload className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Download className="size-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-sm">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>File actions</DropdownMenuLabel>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Move to</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="Members list">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {member.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[140px]">
                    <Select defaultValue={member.teams}>
                      <SelectTrigger variant="ghost" size="sm">
                        <SelectValue />
                        <span className="ml-1 text-muted-foreground">team</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="w-[140px]">
                    <Select defaultValue={member.role}>
                      <SelectTrigger variant="ghost" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Owner">Owner</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Guest">Guest</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="Basic (with caption)">
        <div className="w-full max-w-md">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="With footer">
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </PreviewCard>

      <PreviewCard label="With actions">
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="w-[60px] text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PreviewCard>
    </PreviewGrid>
  )
}
