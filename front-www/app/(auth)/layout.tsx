import Sidebar from "@/components/auth/sidebar";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
      <div className="h-full flex flex-col gap-y-10 bg-white">
        <Sidebar>
            {children}
        </Sidebar>
        
      </div>
    );
  };
  
  export default AuthLayout;