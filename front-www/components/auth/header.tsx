import Image from "next/image";

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <Image
                src="/logo-streamshare-form.png" 
                alt="logo" 
                width={300} 
                height={300}>
            </Image>        
            <p className="text-muted-foreground text-sm text-white">
                {label}
            </p>
        </div>
    )
}