import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  //API and Mapping Array Practice
  const [registry, setRegistry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
      setRegistry(res.data.data[0].attributes.prodi[0]);
    }

    fetchData();
  }, [])

  const toCapitalCase = (s) => {
    var sentence = ""
    s.split(" ").map((word, index) => {
      sentence += s.charAt(0).toUpperCase() + s.substring(1) + " "
    })
    return sentence.trim()
  }

  const getNPM = (year, major, id) => {
    var year_start = parseInt(year.substring(2));
    var year_end = year_start + 4;
    var id_formatted = ((parseInt(id) + 10000) + "").substring(1)
    return (year_start + "" + year_end + "" + major + "" + id_formatted)
  }

  const getGender = (gender) => {
    return gender === "L" ? "Laki-laki" :
      gender === "P" ? "Perempuan" : "?"
  }

  const showMajors = (major) => {
    var secretary = (<></>)
    if (major.sektretaris) {
      secretary = (
        <span> Sekretaris: {major.sektretaris} <br /></span>
      )
    }
    return (
      <>
        <span>{major.nama_prodi} <br /></span>
        <span>Kepala : {major.kepala_prodi} <br /></span>
        {secretary}
        <br />

        {major.mahasiswa.map((year, year_index) => {
          return (
            <div key={year_index} style={{ textAlign: "center" }}>
              {showYears(year, major.kode_prodi)}
            </div>
          )
        })}
      </>
    )
  }

  const showYears = (year, major) => {
    return (
      <>
        <span>Angkatan : {year.tahun_masuk} <br /></span>
        {Object.keys(year.data).map((session_key, session_index) => {
          return (
            <div key={session_index}>
              {showSessions(year.data[session_key], session_key, year.tahun_masuk, major)}
            </div>
          )
        })}
        <br />
      </>
    )
  };

  const showSessions = (session, session_key, year, major) => {
    var students = (<></>)
    if (session.length == 0) {
      students = <span>Tidak ada Mahasiswa yang mengambil kelas ini</span>
    } else {
      students = (
        <table style={{ textAlign: "center", minWidth: "90%", }} border="1px solid black">
          <tbody>
            <tr>
              <th>NPM</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Jenis Kelamin</th>
              <th>Hobi</th>
            </tr>
            {session.map((student, student_index) => {
              return (<tr key={student_index}>
                {showStudents(student, year, major)}
              </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    return (
      <>
        <span>Kelas {toCapitalCase(session_key)}</span>
        <center>
          {students}
        </center>
        <br />
      </>
    )
  }

  const showStudents = (student, year, major) => {
    return (
      <>
        <td>{getNPM(year, major, student.id)}</td>
        <td>{student.nama}</td>
        <td>{student.alamat}</td>
        <td>{getGender(student.jenis_kelamin)}</td>
        <td>{student.hobi.join(", ")}</td>
      </>
    )
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <br /><hr />

      <h1>API + Mapping</h1>
      <div>
        {registry?.map((major, major_index) => {
          return (
            <div key={major_index}>
              {showMajors(major)}
            </div>
          )
        })}
        <p>
          Agak ngetroll jg data ny lol. Terkubur berlapis lapis, sektretaris. <br />
          Btw, ternyato const func1 = (paramA) ={'>'} (paramB) ={'>'} { } dan <br />
          const func2 = (paramA, paramB) ={'>'} { } beda. Function getNPM ak dk biso <br />
          pas ak pake func1, tpi yg handleInput kemaren malah hrus func1 :/<br />
        </p>
      </div>

      <br /><hr />

      <ul className="read-the-docs">
        References:
        <li><a href='https://stackoverflow.com/questions/51576155/pass-a-variable-reference-in-react'>Trick to change default set behaviour</a></li>
        <li><a href='https://react.dev/learn/thinking-in-react'>Input and OnChange</a></li>
        <li><a href='https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component'>Multiple useEffect</a></li>
        <li><a href='https://stackoverflow.com/questions/40803828/how-can-i-map-through-an-object-in-reactjs'>Mapping Objects</a></li>
        <li><a href='https://stackoverflow.com/questions/37571418/reactnative-how-to-center-text'>React Styling</a></li>
        <li><a href=''>...</a></li>
      </ul>
    </>
  )
}

export default App
