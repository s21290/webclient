import { RawTextControlParams } from "../sharedFormsParams";
import FormControl from "../FormControl";

const Password = (props: Readonly<RawTextControlParams>) => {
  return <FormControl maxLength={100} pattern=".*\S.*" type="password" {...props} />;
};

export default Password;
