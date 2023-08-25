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

  //API and Mapping Array Test
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://strapi-rygs.onrender.com/api/quotes");
      setQuotes(res.data.data);
    }

    fetchData();
  }, [])

  //Calculator
  const [result, setResult] = useState(" = 0")
  const [numbers, setNumbers] = useState({
    numberA: 0,
    operator: "+",
    numberB: 0,
  })

  const handleSetNumbers = (key) => (event) => {
    if (key === 'O') {
      var op = event.target.value;
      setNumbers(numbers => ({
        ...numbers,
        ...{ operator: op }
      }));
    } else {
      var num = parseFloat(event.target.value);
      if (key === 'A') {
        setNumbers(numbers => ({
          ...numbers,
          ...{ numberA: num }
        }));
      } else {
        setNumbers(numbers => ({
          ...numbers,
          ...{ numberB: num }
        }));
      }
    }
  }

  useEffect(() => {
    setResult(" = " + (
      numbers.operator === "+" ? (numbers.numberA + numbers.numberB) :
        numbers.operator === "-" ? (numbers.numberA - numbers.numberB) :
          numbers.operator === "*" ? (numbers.numberA * numbers.numberB) :
            numbers.operator === "/" ? (numbers.numberA / numbers.numberB) :
              numbers.operator === "^" ? (numbers.numberA ^ numbers.numberB) :
                numbers.operator === "%" ? (numbers.numberA % numbers.numberB) : "?"
    ));
  }, [numbers]);

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

      <hr />

      <h1>API + Mapping</h1>
      <div>
        {registry.map((major, major_index) => {
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

      <h1>API + Mapping</h1>
      <div>
        {quotes.map((quote, index) => {
          return (
            <div key={index}>
              "{quote.attributes.Quote}.."
              <br />
              - {quote.attributes.Author}
              <br />
            </div>
          )
        })}
        <p>
          P.S. Entah ngapo yg React ak hrus tarok return(element) biar biso tampil. Klo tebakan ak <br />
          si karna map it masih termasuk function dan (entah ngapo, beda dri yg lain) dk otomatis <br />
          ngebalekke nilai.
        </p>
      </div>

      <br /><hr />

      <h1>Calc + Ulator</h1>
      <form className="card">
        <input type="text" value={numbers.numberA}
          onChange={handleSetNumbers('A')} /><br />
        <input type="text" value={numbers.operator}
          onChange={handleSetNumbers('O')} /><br />
        <input type="text" value={numbers.numberB}
          onChange={handleSetNumbers('B')} /><br />
        <input type="text" value={result} readOnly />
        <p>
          Hi! My name is <code>Robert</code> <code>Antonius</code>.
          Use <code>+</code> , <code>-</code> , <code>*</code> , <code>/</code> , <code>^</code> , or <code>%</code> . <br />
          Entah ngapo, yg operatorny kadang ngelag, dk biso diubah kecuali kalo kito block ke isiny dan ganti character laen. <br />
          Kadang jg harus ubah nomor 1 ato nomor 2 dulu bru dio te update. Aku samo sekali dk tw ngapo, klo ad yg tw biso tulis di <code>Issue</code>. <br />
          Edit: Thx atas bantuanny. Ak dtw klo React jugo biso manggil array pake array.key. Setelah ak ubah ke format it glo <br />
          biso bru edit smoothless. Cakny sih karena ak pake system array[stringkey] dio kadang ad delay dan dk pas editny. Ak pikir mungkin <br />
          keren soalny kemaren klo ak biso ubah it func it biar biso universal, tpi akhirny malah ribet. <br />
        </p>
      </form>

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
