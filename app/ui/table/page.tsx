"use client"

import * as React from "react"
import {
  Phone,
  Star,
  Upload,
  Download,
  MoreHorizontal,
  Folder,
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold text-foreground">{children}</h2>
}

type Organisation = {
  id: string
  logo: string
  logoBg: string
  name: string
  amount: string
  status: "Qualification" | "Negotiation" | "Meeting" | "Proposal made"
  statusColor: string
  email: string
  mobile: string
  assigneeName: string
  assigneeAvatar: string
  assigneeFallback: string
  lastModified: string
}

const organisations: Organisation[] = [
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
  {
    id: "4",
    logo: "G",
    logoBg: "bg-pink-400 text-white",
    name: "Gumroad",
    amount: "₹ 4,60,000",
    status: "Proposal made",
    statusColor: "bg-cyan-500",
    email: "john@example.com",
    mobile: "+91 2223334444",
    assigneeName: "Michael Chen",
    assigneeAvatar: "https://i.pravatar.cc/40?img=33",
    assigneeFallback: "MC",
    lastModified: "5 days ago",
  },
  {
    id: "5",
    logo: "N",
    logoBg: "bg-red-500 text-white",
    name: "Notion",
    amount: "₹ 6,20,000",
    status: "Qualification",
    statusColor: "bg-blue-500",
    email: "priya@example.com",
    mobile: "+91 8881112222",
    assigneeName: "Rahul Sharma",
    assigneeAvatar: "https://i.pravatar.cc/40?img=11",
    assigneeFallback: "RS",
    lastModified: "3 days ago",
  },
  {
    id: "6",
    logo: "F",
    logoBg: "bg-green-500 text-white",
    name: "Figma",
    amount: "₹ 7,80,000",
    status: "Negotiation",
    statusColor: "bg-purple-500",
    email: "amanda@example.com",
    mobile: "+91 4445556666",
    assigneeName: "Neha Kapoor",
    assigneeAvatar: "https://i.pravatar.cc/40?img=49",
    assigneeFallback: "NK",
    lastModified: "1 week ago",
  },
  {
    id: "7",
    logo: "L",
    logoBg: "bg-indigo-500 text-white",
    name: "Linear",
    amount: "₹ 3,20,000",
    status: "Meeting",
    statusColor: "bg-orange-500",
    email: "robert@example.com",
    mobile: "+91 6667778888",
    assigneeName: "James Lee",
    assigneeAvatar: "https://i.pravatar.cc/40?img=60",
    assigneeFallback: "JL",
    lastModified: "4 days ago",
  },
  {
    id: "8",
    logo: "V",
    logoBg: "bg-slate-800 text-white",
    name: "Vercel",
    amount: "₹ 8,50,000",
    status: "Proposal made",
    statusColor: "bg-cyan-500",
    email: "sophia@example.com",
    mobile: "+91 9990001111",
    assigneeName: "David Kim",
    assigneeAvatar: "https://i.pravatar.cc/40?img=52",
    assigneeFallback: "DK",
    lastModified: "Yesterday",
  },
  {
    id: "9",
    logo: "S",
    logoBg: "bg-emerald-500 text-white",
    name: "Supabase",
    amount: "₹ 5,90,000",
    status: "Qualification",
    statusColor: "bg-blue-500",
    email: "olivia@example.com",
    mobile: "+91 1112223333",
    assigneeName: "Priya Menon",
    assigneeAvatar: "https://i.pravatar.cc/40?img=48",
    assigneeFallback: "PM",
    lastModified: "6 days ago",
  },
  {
    id: "10",
    logo: "R",
    logoBg: "bg-orange-600 text-white",
    name: "Retool",
    amount: "₹ 4,10,000",
    status: "Negotiation",
    statusColor: "bg-purple-500",
    email: "ethan@example.com",
    mobile: "+91 2224445555",
    assigneeName: "Lisa Park",
    assigneeAvatar: "https://i.pravatar.cc/40?img=20",
    assigneeFallback: "LP",
    lastModified: "2 weeks ago",
  },
]

type DriveDocument = {
  id: string
  name: string
  ownerName: string
  ownerAvatar: string
  ownerFallback: string
  size: string
  dateModified: string
  selected?: boolean
}

const driveDocuments: DriveDocument[] = [
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
  {
    id: "4",
    name: "Marketing Assets",
    ownerName: "Michael Brown",
    ownerAvatar: "https://i.pravatar.cc/40?img=22",
    ownerFallback: "MB",
    size: "124.6 MB",
    dateModified: "3 weeks ago",
  },
  {
    id: "5",
    name: "Client Presentations",
    ownerName: "Sarah Johnson",
    ownerAvatar: "https://i.pravatar.cc/40?img=29",
    ownerFallback: "SJ",
    size: "88.1 MB",
    dateModified: "Yesterday",
  },
  {
    id: "6",
    name: "Brand Guidelines",
    ownerName: "David Wilson",
    ownerAvatar: "https://i.pravatar.cc/40?img=52",
    ownerFallback: "DW",
    size: "12.3 MB",
    dateModified: "1 month ago",
  },
  {
    id: "7",
    name: "Product Screenshots",
    ownerName: "Linda Martinez",
    ownerAvatar: "https://i.pravatar.cc/40?img=31",
    ownerFallback: "LM",
    size: "203.7 MB",
    dateModified: "4 days ago",
  },
  {
    id: "8",
    name: "Video Content",
    ownerName: "James Taylor",
    ownerAvatar: "https://i.pravatar.cc/40?img=60",
    ownerFallback: "JT",
    size: "1.2 GB",
    dateModified: "2 hours ago",
  },
  {
    id: "9",
    name: "UI Mockups",
    ownerName: "Rachel Green",
    ownerAvatar: "https://i.pravatar.cc/40?img=38",
    ownerFallback: "RG",
    size: "67.5 MB",
    dateModified: "6 days ago",
  },
  {
    id: "10",
    name: "Archive 2024",
    ownerName: "Tom Anderson",
    ownerAvatar: "https://i.pravatar.cc/40?img=68",
    ownerFallback: "TA",
    size: "456.9 MB",
    dateModified: "3 months ago",
  },
]

type Member = {
  id: string
  name: string
  email: string
  avatar: string
  fallback: string
  teams: string
  role: string
}

const members: Member[] = [
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
  {
    id: "3",
    name: "Bob",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/40?img=33",
    fallback: "BO",
    teams: "3",
    role: "Guest",
  },
  {
    id: "4",
    name: "Charlie",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/40?img=45",
    fallback: "CH",
    teams: "4",
    role: "Member",
  },
]

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  {
    invoice: "INV006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$200.00",
  },
  {
    invoice: "INV007",
    status: "Unpaid",
    method: "Credit Card",
    amount: "$300.00",
  },
]

const products = [
  { id: "1", name: "Wireless Mouse", price: "$29.99" },
  { id: "2", name: "Mechanical Keyboard", price: "$149.99" },
  { id: "3", name: "USB-C Hub", price: "$49.99" },
]

export default function TablePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* CRM Table */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Organisations</SectionTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>Organisation</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile no.</TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>Last modified</TableHead>
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
                    <span className="text-muted-foreground">{org.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {org.email}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="size-3.5" />
                    {org.mobile}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage src={org.assigneeAvatar} />
                      <AvatarFallback>{org.assigneeFallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{org.assigneeName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {org.lastModified}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Drive documents */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Drive documents</SectionTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date modified</TableHead>
              <TableHead className="w-[180px] text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {driveDocuments.map((doc) => (
              <TableRow
                key={doc.id}
                data-state={doc.selected ? "selected" : undefined}
              >
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
                <TableCell className="text-muted-foreground">
                  {doc.dateModified}
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
                          <DropdownMenuItem>Make a copy</DropdownMenuItem>
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

      {/* Members list */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Members list</SectionTitle>
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
                <TableCell className="w-[180px]">
                  <Select defaultValue={member.teams}>
                    <SelectTrigger variant="ghost" size="sm">
                      <SelectValue />
                      <span className="ml-1 text-muted-foreground">team</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="w-[180px]">
                  <Select defaultValue={member.role}>
                    <SelectTrigger variant="ghost" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Basic */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic</SectionTitle>
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
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* With Footer */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Footer</SectionTitle>
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
            {invoices.slice(0, 4).map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
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

      {/* With Actions */}
      <div className="flex flex-col gap-4">
        <SectionTitle>With Actions</SectionTitle>
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
    </div>
  )
}
