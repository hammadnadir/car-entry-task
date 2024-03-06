import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoaderScreen from "@/components/loaderScreen";
import { wrapper } from "@/store";

const { Text, Title } = Typography;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      if (!result?.ok) {
        toast.error(result?.error);
        return;
      }
      toast.dismiss();
      toast.success("Login Successfully");
      router.push("/");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      {loading && <LoaderScreen />}
      <div className="login-form-content">
        <div className="login-form-header">
          <Title level={3}>Sign In</Title>
        </div>
        <Form
          name="normal_login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-button"
              block
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({ req, res }) => {

    const session = await getSession({ req });
    if (session?.user?.token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default LoginForm;
