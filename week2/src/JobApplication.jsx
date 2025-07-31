import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

export default function JobApplication() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Form />
    </div>
  );
}

//to avoid mess, we create the whole Form in another component :)

function Form() {
  //we need to define all rules for each input

  const validationSchema = Yup.object().shape({
    fullNamr: Yup.string(),
    email: Yup.string()
      //the .email() method already uses a built-in pattern
      //which makes yup = cleaner, more powerfull than register()
      .email("Invalid email format")
      .required("Email is required"),
    position: Yup.string().required("please select a position"),
    resume: Yup.mixed().required("please upload your resume"),
  });

  const {
    register, //connects inputs to the form system
    handleSubmit, //handles the form submission
    //isSubmitting automatically tracks submission state
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema), //resolver connects Yup to react-hook-form
  });

  const onSubmit = async (data) => {
    //data is an object containing all the values the user entered

    try {
      toast.loading("Sending application...");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, //service ID => like Gmail, Outlook...
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, //template ID => pre-designed message you create at EmailJS
        {
          fullName: data.fullName,
          email: data.email,
          position: data.position,
          resume: data.resume[0]?.name || "No file uploaded",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY //use_id or just public_key => it authenticates your frontend to send messages
      );
      toast.dismiss(); //removes the "Sending application..."
      toast.success("Application submitted successfully!"); //shows a new toast instead

      //why?
      //because we want to show a loading spinner first
      //then remove the spinner once we're done
      //and then show a final success or error toast

      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
      console.error("Error sending email: ", error);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Work With Us!</h1>
      <div>
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name"></label>
          <input
            className="input"
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
          />
          <label htmlFor="email"></label>
          <input
            className="input"
            type="email"
            name=""
            id=""
            placeholder="example@gmail.com"
            //register() is function that gives back an OBJECT full of TOOLS react hook form needs to track the user typing, errors, connect to form system, etc.
            // ... Take all the things inside that object and put them into this input

            //...register() is a super-powered version of setAttribute
            {...register("email")}
            //object returns looks like this {name: "email", onChange:...m onBlur:..., }
            //so basically the input with then look like <input name="email" onChange={} onBlur={} />
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px", marginLeft: "5px" }}>
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="phone"></label>
          <input
            type="tel"
            className="input"
            name=""
            id=""
            placeholder="09300000000"
            {...register("phone")}
          />
          {errors.phone && (
            <p style={{ color: "red", fontSize: "10px", marginLeft: "5px" }}>
              {errors.phone.message}
            </p>
          )}
          <label
            htmlFor="position"
            style={{ paddingLeft: "5px", paddingTop: "15px" }}
          >
            What Position Are You Applying For?
          </label>
          <select
            name=""
            id=""
            {...register("position", {
              required: "Please select a job position",
            })}
          >
            <option value="">Select a Position</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          {errors.position && (
            <p style={{ color: "red", fontSize: "10px", marginLeft: "5px" }}>
              {errors.position.message}
            </p>
          )}
          <label htmlFor="resume" className="file-upload-label">
            Upload resume
          </label>
          <input
            type="file"
            className="hidden-file-input"
            name=""
            id="resume"
            accept=".pdf, .doc, .docx, .jpeg"
            {...register("resume")}
          />
          {errors.resume && (
            <p style={{ color: "red", fontSize: "10px", marginLeft: "5px" }}>
              {errors.resume.message}
            </p>
          )}
          <button type="submit" className="login-button">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {/* REMOVE THE BELOW TAG TO USE THE CODE IN YOUR PROJECT!!! */}
      <p style={{ color: "grey", fontSize: "10px", paddingLeft: "5px" }}>
        Created by Saharnaz_CH{" "}
      </p>
    </div>
  );
}
