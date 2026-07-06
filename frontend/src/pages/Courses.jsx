import { useEffect, useState } from "react";
import api from "../services/api";

function Courses() {

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    course_code: "",
    course_name: "",
    faculty: ""
  });

  const loadCourses = async () => {
    const res = await api.get("/courses/");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const addCourse = async () => {

    if (
      !form.course_code ||
      !form.course_name ||
      !form.faculty
    ) {
      alert("Fill all fields");
      return;
    }

    await api.post(
      "/courses/",
      form
    );

    setForm({
      course_code: "",
      course_name: "",
      faculty: ""
    });

    loadCourses();
  };

  const deleteCourse = async (id) => {

    await api.delete(
      `/courses/${id}/`
    );

    loadCourses();
  };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        Course Management
      </h1>

      <div>

        <input
          placeholder="Course Code"
          value={form.course_code}
          onChange={(e)=>
            setForm({
              ...form,
              course_code:e.target.value
            })
          }
        />

        <input
          placeholder="Course Name"
          value={form.course_name}
          onChange={(e)=>
            setForm({
              ...form,
              course_name:e.target.value
            })
          }
        />

        <input
          placeholder="Faculty"
          value={form.faculty}
          onChange={(e)=>
            setForm({
              ...form,
              faculty:e.target.value
            })
          }
        />

        <button onClick={addCourse}>
          Add Course
        </button>

      </div>

      <br />

      <table border="1">

        <thead>

          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Faculty</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {courses.map((c)=>(

            <tr key={c.id}>

              <td>{c.id}</td>
              <td>{c.course_code}</td>
              <td>{c.course_name}</td>
              <td>{c.faculty}</td>

              <td>

                <button
                  onClick={()=>
                    deleteCourse(c.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Courses;