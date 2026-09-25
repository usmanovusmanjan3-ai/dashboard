/* ================================
   O'QITUVCHILAR
================================ */

const teachers = [
    {
        id: 1,
        name: "Azizbek Karimov",
        subject: "Tarix",
        password: "1234"
    },
    {
        id: 2,
        name: "Madina Aliyeva",
        subject: "Ona tili",
        password: "5678"
    },
    {
        id: 3,
        name: "Jasur Rahmonov",
        subject: "Matematika",
        password: "2468"
    },
    {
        id: 4,
        name: "Dilnoza Islomova",
        subject: "Ingliz tili",
        password: "1357"
    },
    {
        id: 5,
        name: "Sardor Tursunov",
        subject: "Informatika",
        password: "1111"
    }
];


/* ================================
   O'QUVCHILAR
================================ */

const students = [
    "Abdulloh Aliyev",
    "Muhammadali Karimov",
    "Aziza Rahimova",
    "Madina Xasanova",
    "Javohir Tursunov",
    "Diyorbek Ismoilov",
    "Malika Abdullayeva",
    "Sardor Karimov",
    "Shahzoda Akbarova",
    "Bekzod Rasulov",
    "Zarina Sobirova",
    "Temur Yoqubov",
    "Mohira Saidova",
    "Bobur Qodirov",
    "Sevinch Ergasheva",
    "Asadbek Umarov",
    "Nilufar Karimova",
    "Otabek Xolmatov",
    "Gulnoza Raxmatova",
    "Ibrohim Sodiqov",
    "Madina Yoqubova",
    "Javohir Abduqodirov",
    "Shahnoza Karimova",
    "Farrux Aliyev",
    "Munisa Ismoilova",
    "Azamat Tursunov",
    "Rayhona Qosimova",
    "Sanjar Rahmonov",
    "Diyora Abdullayeva",
    "Umidjon Rasulov",
    "Mubina Xasanova",
    "Akmal Sodiqov",
    "Feruza Karimova",
    "Suhrob Yoqubov",
    "Iroda Aliyeva",
    "Oybek Tursunov",
    "Gulbahor Islomova",
    "Rustam Qodirov",
    "Shaxzoda Rahimova",
    "Kamron Akbarov",
    "Lola Sobirova",
    "Islom Karimov",
    "Madina Raxmatova",
    "Doston Umarov",
    "Zebo Saidova",
    "Behruz Xolmatov",
    "Nodira Qosimova",
    "Sherzod Rasulov",
    "Umida Aliyeva",
    "Jasmina Karimova",
    "Sardorbek Rahmonov",
    "Dilshod Ismoilov",
    "Maftuna Abdullayeva",
    "Olim Qodirov",
    "Shahlo Xasanova",
    "Murod Yoqubov",
    "Sabina Karimova",
    "Elyor Tursunov",
    "Madina Akbarova"
];


/* ================================
   O'QUVCHILARNI OBJECT QILISH
================================ */

let studentData = students.map((name, index) => {

    return {
        id: index + 1,

        name: name,

        className: "6-" + ((index % 4) + 1),

        present: false,

        grade: null,

        gradeBy: null
    };

});


/* ================================
   LOCAL STORAGE
================================ */

const savedData = localStorage.getItem("neonStudents");

if (savedData) {

    studentData = JSON.parse(savedData);

}


/* ================================
   STATISTIKA
================================ */

function updateStats() {

    document.getElementById("studentCount").textContent =
        studentData.length;

    document.getElementById("teacherCount").textContent =
        teachers.length;

    document.getElementById("presentCount").textContent =
        studentData.filter(s => s.present).length;

    document.getElementById("gradeCount").textContent =
        studentData.filter(s => s.grade !== null).length;
}


/* ================================
   STUDENT LIST
================================ */

function renderStudents() {

    const container =
        document.getElementById("studentList");

    const search =
        document.getElementById("searchStudent")
        .value
        .toLowerCase();

    container.innerHTML = "";

    studentData
        .filter(student =>
            student.name.toLowerCase().includes(search)
        )
        .forEach(student => {

            const div = document.createElement("div");

            div.className = "student";

            div.innerHTML = `

                <div>
                    <div class="student-name">
                        ${student.name}
                    </div>

                    <div class="student-class">
                        ${student.className}-sinf
                    </div>
                </div>

                <div>

                    ${
                        student.grade !== null
                        ?
                        `<span class="status present">
                            ⭐ ${student.grade}
                        </span>`
                        :
                        ""
                    }

                    <span class="status ${
                        student.present
                        ? "present"
                        : "absent"
                    }">

                        ${
                            student.present
                            ? "Keldi"
                            : "Kelmagan"
                        }

                    </span>

                </div>

            `;

            container.appendChild(div);

        });

    updateStats();
}


/* ================================
   TEACHER LIST
================================ */

function renderTeachers() {

    const container =
        document.getElementById("teacherList");

    container.innerHTML = "";

    teachers.forEach(teacher => {

        const div = document.createElement("div");

        div.className = "teacher-card";

        div.innerHTML = `

            <h3>👨‍🏫 ${teacher.name}</h3>

            <p>Fan: ${teacher.subject}</p>

            <p>Parol: <b>${teacher.password}</b></p>

        `;

        container.appendChild(div);

    });
}


/* ================================
   LOGIN
================================ */

function openLogin() {

    document.getElementById("loginModal")
        .style.display = "flex";

    document.getElementById("loginMessage")
        .textContent = "";

}


function closeLogin() {

    document.getElementById("loginModal")
        .style.display = "none";

}


/* ================================
   TEACHER SELECT
================================ */

function loadTeacherSelect() {

    const select =
        document.getElementById("teacherSelect");

    select.innerHTML = "";

    teachers.forEach(teacher => {

        const option =
            document.createElement("option");

        option.value = teacher.id;

        option.textContent =
            `${teacher.name} — ${teacher.subject}`;

        select.appendChild(option);

    });
}


/* ================================
   TEACHER LOGIN
================================ */

let currentTeacher = null;

function teacherLogin() {

    const id =
        Number(
            document.getElementById("teacherSelect").value
        );

    const password =
        document.getElementById("teacherPassword").value;

    const teacher =
        teachers.find(t => t.id === id);

    if (!teacher) return;


    if (teacher.password !== password) {

        document.getElementById("loginMessage")
            .textContent =
            "❌ Parol noto‘g‘ri!";

        document.getElementById("loginMessage")
            .style.color = "#ff3355";

        return;
    }


    currentTeacher = teacher;

    closeLogin();

    document.getElementById("teacherPanel")
        .style.display = "block";

    document.getElementById("loggedTeacher")
        .textContent =
        `${teacher.name} — ${teacher.subject}`;

    showAttendance();

}


/* ================================
   ATTENDANCE
================================ */

function showAttendance() {

    const container =
        document.getElementById("teacherContent");

    container.innerHTML = `

        <h2 style="color:#ffd700;margin-bottom:20px">
            📋 Davomat
        </h2>

    `;


    studentData.forEach(student => {

        const row =
            document.createElement("div");

        row.className = "teacher-row";

        row.innerHTML = `

            <div>
                <b>${student.name}</b>

                <div style="color:#777">
                    ${student.className}-sinf
                </div>
            </div>


            <button
                class="attendance-btn ${
                    student.present ? "active" : ""
                }"
                onclick="toggleAttendance(${student.id})">

                ${
                    student.present
                    ? "🟢 Keldi"
                    : "🔴 Kelmagan"
                }

            </button>


            <div>
                ${
                    student.grade !== null
                    ? `⭐ Baho: ${student.grade}`
                    : "Baho qo‘yilmagan"
                }
            </div>

        `;

        container.appendChild(row);

    });

}


/* ================================
   TOGGLE ATTENDANCE
================================ */

function toggleAttendance(id) {

    const student =
        studentData.find(s => s.id === id);

    if (!student) return;

    student.present =
        !student.present;

    saveData();

    showAttendance();

    renderStudents();

}


/* ================================
   GRADES
================================ */

function showGrades() {

    const container =
        document.getElementById("teacherContent");

    container.innerHTML = `

        <h2 style="color:#ffd700;margin-bottom:20px">
            ⭐ O‘quvchilarga baho qo‘yish
        </h2>

    `;


    studentData.forEach(student => {

        const row =
            document.createElement("div");

        row.className = "teacher-row";

        row.innerHTML = `

            <div>

                <b>${student.name}</b>

                <div style="color:#777">
                    ${student.className}-sinf
                </div>

            </div>


            <div>

                <input
                    class="grade-input"
                    type="number"
                    min="1"
                    max="5"
                    value="${
                        student.grade ?? ""
                    }"
                    id="grade-${student.id}"
                    placeholder="1-5"
                >

            </div>


            <button
                class="gold-btn"
                onclick="saveGrade(${student.id})">

                💾 Saqlash

            </button>

        `;

        container.appendChild(row);

    });

}


/* ================================
   SAVE GRADE
================================ */

function saveGrade(id) {

    const input =
        document.getElementById(
            `grade-${id}`
        );

    const grade =
        Number(input.value);

    if (grade < 1 || grade > 5) {

        alert("Baho 1 dan 5 gacha bo‘lishi kerak!");

        return;
    }


    const student =
        studentData.find(s => s.id === id);

    if (!student) return;


    student.grade = grade;

    student.gradeBy =
        currentTeacher.name;


    saveData();

    alert(
        `${student.name} ga ${grade} baho qo‘yildi!`
    );

    showGrades();

    renderStudents();

}


/* ================================
   SAVE
================================ */

function saveData() {

    localStorage.setItem(
        "neonStudents",
        JSON.stringify(studentData)
    );

    updateStats();

}


/* ================================
   LOGOUT
================================ */

function logout() {

    currentTeacher = null;

    document.getElementById("teacherPanel")
        .style.display = "none";

}


/* ================================
   START
================================ */

loadTeacherSelect();

renderTeachers();

renderStudents();

updateStats();