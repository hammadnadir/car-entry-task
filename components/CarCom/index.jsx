import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Select, Typography, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import LoaderScreen from "../loaderScreen";
import { useDispatch } from "react-redux";
import { addCarEntryRequest } from "@/redux/home";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const { Option } = Select;
const { Text } = Typography;

function CarForm() {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const imageUrls = await uploadImagesToFirebase(imageList);

      const formData = { ...values, images: imageUrls };
      dispatch(addCarEntryRequest({ formData, session })).then((res) => {
        if (res?.payload?._id) {
            form.resetFields();
            setImageList([]);
            toast.success("Form submitted successfully!");
        } else {
            toast.error("Something went wrong!");
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Failed to submit the form.");
      } else {
        alert("Failed to submit the form. Please try again later.");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleImageChange = ({ fileList }) => {
    setImageList(fileList);
  };
  const uploadImagesToFirebase = async (images) => {
    const urls = [];
    try {
      for (const image of images) {
        const storageRef = ref(storage, `images/${uuidv4()}_${image.name}`);
        const snapshot = await uploadBytesResumable(
          storageRef,
          image.originFileObj
        );
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }
      return urls;
    } catch (error) {
      console.error("Error uploading images to Firebase:", error);
      throw error;
    }
  };

  return (
    <div className="car-form form-container">
      {" "}
      {loading && <LoaderScreen />}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ copies: 1 }}
      >
        <Form.Item
          name="model"
          label="Car Model"
          rules={[
            {
              required: true,
              message: "Please input the car model!",
              min: 3,
            },
          ]}
        >
          <Input placeholder="Car Model" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the price!",
              type: "number",
              transform: (value) => parseFloat(value), // Convert the input value to a number
              validator: (rule, value) =>
                value >= 0.01
                  ? Promise.resolve()
                  : Promise.reject("Price must be at least 0.01"), // Validate minimum value
            },
          ]}
        >
          <Input type="number" placeholder="Price" step="0.01" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
              len: 11,
              pattern: /^[0-9]*$/,
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please select a city!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="lahore">Lahore</Radio>
            <Radio value="karachi">Karachi</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="copies"
          label="Max Number of Pictures"
          rules={[
            {
              required: true,
              message: "Please select the max number of pictures!",
              type: "number",
              min: 1,
              max: 10,
            },
          ]}
        >
          <Select placeholder="Max Number of Pictures">
            {[...Array(10)].map((_, index) => (
              <Option key={index + 1} value={index + 1}>
                {index + 1}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload Pictures"
          valuePropName="fileList"
          getValueFromEvent={handleImageChange}
          extra="You can upload multiple pictures"
        >
          <Upload
            listType="picture-card"
            multiple={true}
            maxCount={imageList.length > 0 ? imageList.length : 10}
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            {imageList.length < 10 && <UploadOutlined />}
          </Upload>
        </Form.Item>
        {imageList.length === 0 && (
          <Text type="danger">Please upload at least one picture.</Text>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CarForm;
