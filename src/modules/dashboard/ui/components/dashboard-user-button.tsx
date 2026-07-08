import { authClient } from "@/lib/auth-client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
}

export const DashboardUserButton = () =>{

    const router = useRouter();
    const isMobile=useIsMobile()
    const {data, isPending} = authClient.useSession();
    

    const onLogout=() =>{
           authClient.signOut({
            fetchOptions : {
                onSuccess : ()=> {
                    router.push("/sign-in")
                }
            }
        })

    }
    
    if(isPending || !data?.user){
        return null;
    }
    console.log("Session:", data.user.image);

    const avatar = (
        <Avatar className="size-9 shrink-0 mr-3">
            <AvatarImage
                src={data.user.image ?? ""}
                alt={data.user.name}
                referrerPolicy="no-referrer"
                className="object-cover"
            />
            <AvatarFallback delayMs={600}>
                {getInitials(data.user.name)}
            </AvatarFallback>
        </Avatar>
    )

    if(isMobile){
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                    {avatar}
            <div className="flex flex-col gap-0.5 text-left overflow-hidden gap-x-2 flex-1 min-w-0">
                <p className="text-sm truncate w-full">
                    {data.user.name}
                </p>
                <p className="text-xs truncate w-full">
                    {data.user.email}
                </p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0"/>
                </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{data.user.name}</DrawerTitle>
                    <DrawerDescription>{data.user.email}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                   <Button
                    variant={"outline"}
                    onClick={()=>{}}
                   >
                    <CreditCardIcon className="size-4 text-black"/>
                    Billing
                   </Button>

                   <Button
                    variant={"outline"}
                    onClick={onLogout}
                   >
                    <LogOutIcon className="size-4 text-black"/>
                    Logout
                   </Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        )
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                {avatar}
            <div className="flex flex-col gap-0.5 text-left overflow-hidden gap-x-2 flex-1 min-w-0">
                <p className="text-sm truncate w-full">
                    {data.user.name}
                </p>
                <p className="text-xs truncate w-full">
                    {data.user.email}
                </p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                         <span className="font-medium truncate">{data.user.name}</span>
                         <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between ">
                    
                    Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between " onClick={onLogout}>
                    
                    Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
            

        </DropdownMenu>
    )
}
