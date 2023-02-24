import agent from "../../api/agent"

export const LoginForm = () => {
    const handleClick = async () => {
        await agent.Auth.login();
    }

    return (
        <>
            <button onClick={() => {handleClick()}}>Login</button>
        </>
    )
}

export default LoginForm;