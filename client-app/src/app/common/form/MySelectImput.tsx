import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    placeholder:string;
    name:string;
    label?:string;
    options: any;
}

export default function MySelectImput(props : Props){
    const[field, meta, helpers] = useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(e,d) => helpers.setValue(d.value)}
            onBlur={() => helpers.setTouched(true)}
            placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label id="red" content={meta.error}/>
            ) : null}
        </Form.Field>
    )

}