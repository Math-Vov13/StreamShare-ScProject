import { LoginForm } from "@/components/auth/login-form";

const page = () => {

    return (
        <div className="flex h-screen justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600">
            <LoginForm />
        </div>
    );
}

export default page;