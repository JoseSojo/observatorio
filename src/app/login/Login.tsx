"use client";

import { useGuiLogin } from "../../_hooks/gui/useGuiLogin";
import { LoginForm } from "../../_UI/_compounds/LoginForm";
import { AuthPublicTemplate } from "../../_UI/_template/AuthPublicTemplate";

export default function Login() {
    const { error, form, load } = useGuiLogin();

    return (
        <AuthPublicTemplate>
            {
                load
                    ? <>cargando...</>
                    : error
                        ? <>error</>
                        : form && <LoginForm action={form.action} method={form.method} inputList={form.inputList} />
            }
        </AuthPublicTemplate>
    );
}
