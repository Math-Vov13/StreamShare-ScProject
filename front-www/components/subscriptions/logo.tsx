import Image from "next/image";

const Logo = () => (
    <div className="flex flex-col items-center mt-10">
        <Image
            src="/logo-streamshare-form.png"
            alt="Streamshare Logo"
            width={500}
            height={500}
        />
    </div>
);

export default Logo;
