import FormikForm from "@/components/FormikForm";
import { ReactNode } from "react";

const FormPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1>This page use Formik</h1>
      {children}
      {/* <FormikForm /> */}
    </>
  );
};

export default FormPage;
