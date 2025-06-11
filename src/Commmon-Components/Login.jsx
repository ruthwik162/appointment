import { useState } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    role: "student",
    department: "",
    experience: "",
    designation: "",
    rollNo: "",
    className: "",
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { setShowUserLogin, register, login } = useAppContext();

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "profileImage" && files?.length > 0) {
    const file = files[0];
    setData(prev => ({ ...prev, profileImage: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  } else {
    setData(prev => ({ ...prev, [name]: value }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!data.email || !data.password) {
    alert("Please fill in all required fields.");
    setLoading(false);
    return;
  }

  if (state === "register") {
    if (
      data.role === "student" &&
      !data.email.endsWith("@mallareddyuniversity.ac.in")
    ) {
      alert("Student email must be a university email.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "profileImage" && value instanceof File) {
        formData.append("profileImage", value); 
      } else if (value !== null) {
        formData.append(key, value);
      }
    });

    await register(formData); 
    setData({
      username: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      role: "student",
      department: "",
      experience: "",
      designation: "",
      rollNo: "",
      className: "",
      profileImage: null,
    });
    setPreviewImage(null);
    setState("login");
    setLoading(false);
    return;
  }

  await login(data.email, data.password);
  setLoading(false);
};


  const inputStyle =
    "w-full px-4 py-2 mb-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150";

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl overflow-hidden shadow-xl flex w-full max-w-5xl h-[90vh]"
      >
        <div className="hidden md:flex md:w-1/2 bg-[#06d6a0] items-center justify-center p-8">
          <div className="text-center text-white">
            <img
              src={assets.mainbanner_sm}
              alt="Banner"
              className="w-100 mx-auto mb-6 rounded-lg shadow-lg"
            />
            <h2 className="text-2xl font-bold mb-2">Welcome</h2>
            <p>
              {state === "login"
                ? "Sign in to access your dashboard."
                : "Join our platform today."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              {state === "login" ? "Welcome Back!" : "Create an Account"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-start w-full">
            {state === "register" && (
              <>
                <div className="w-full mt-3 flex flex-col items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <label className="mt-2 text-sm text-indigo-500 cursor-pointer">
                    Upload Profile Picture
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={inputStyle}
                />
                <input
                  type="tel"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className={inputStyle}
                />

                <div className="w-full mt-4">
                  <p className="mb-1 font-medium">Gender</p>
                  <div className="flex gap-4 text-sm">
                    {["male", "female", "other"].map((g) => (
                      <label key={g} className="capitalize">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          onChange={handleChange}
                          checked={data.gender === g}
                          className="mr-1"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="w-full mt-4">
                  <p className="mb-1 font-medium">Role</p>
                  <div className="flex gap-4 text-sm">
                    {["student", "teacher", "admin"].map((r) => (
                      <label key={r} className="capitalize">
                        <input
                          type="radio"
                          name="role"
                          value={r}
                          onChange={handleChange}
                          checked={data.role === r}
                          className="mr-1"
                        />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                {data.role === "teacher" && (
                  <>
                    <input
                      type="text"
                      name="department"
                      value={data.department}
                      onChange={handleChange}
                      placeholder="Department"
                      className={inputStyle}
                    />
                    <input
                      type="number"
                      name="experience"
                      value={data.experience}
                      onChange={handleChange}
                      placeholder="Experience"
                      className={inputStyle}
                    />
                    <select
                      name="designation"
                      value={data.designation}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Designation</option>
                      <option value="HOD">HOD</option>
                      <option value="Professor">Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Junior Professor">Junior Professor</option>
                      <option value="Class Incharge">Class Incharge</option>
                    </select>
                  </>
                )}

                {data.role === "student" && (
                  <>
                    <input
                      type="text"
                      name="rollNo"
                      value={data.rollNo}
                      onChange={handleChange}
                      placeholder="Roll Number"
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      name="department"
                      value={data.department}
                      onChange={handleChange}
                      placeholder="Department"
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      name="className"
                      value={data.className}
                      onChange={handleChange}
                      placeholder="Class Name"
                      className={inputStyle}
                    />
                  </>
                )}
              </>
            )}

            {/* Email input with emoji */}
            <div className="flex items-center w-full mb-4 border border-gray-300 rounded-full overflow-hidden pl-4 gap-3">
              <span className="text-gray-400 text-xl select-none">📧</span>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-12"
                required
              />
            </div>

            {/* Password input with emoji */}
            <div className="flex items-center w-full mb-2 border border-gray-300 rounded-full overflow-hidden pl-4 gap-3">
              <span className="text-gray-400 text-xl select-none">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-12"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-indigo-500 mb-4 self-end"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            {state === "login" && (
              <a href="#" className="text-indigo-600 text-sm mb-5 self-start hover:underline">
                Forgot password?
              </a>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-colors disabled:bg-indigo-300"
            >
              {loading ? "Loading..." : state === "login" ? "Login" : "Register"}
            </button>

            <p className="text-gray-500 text-sm mt-4 w-full text-center">
              {state === "login"
                ? "Don’t have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setState(state === "login" ? "register" : "login");
                  setPreviewImage(null);
                  setData({
                    username: "",
                    email: "",
                    password: "",
                    mobile: "",
                    gender: "",
                    role: "student",
                    department: "",
                    experience: "",
                    designation: "",
                    rollNo: "",
                    className: "",
                    profileImage: null,
                  });
                }}
                className="text-indigo-500 hover:underline"
              >
                {state === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;