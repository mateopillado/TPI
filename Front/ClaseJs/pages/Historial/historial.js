let sessions = [];

function init() {
    sessions = [
        {
            id: 1,
            routineName: "Rutina de Fuerza 1",
            date: "2024-01-08",
            duration: "1h 30m",
            cantidadseries:3,
            exercises: [
                {cantidadseries:3, name: "Bench Press", sets: [{ weight: "60", reps: "6", rpe: "8" }, { weight: "70", reps: "5", rpe: "9" }] },
                {cantidadseries:3, name: "Front Squat", sets: [{ weight: "80", reps: "4", rpe: "8" }] },
                {cantidadseries:3, name: "Deadlift", sets: [{ weight: "100", reps: "5", rpe: "8" }] },
                {cantidadseries:3, name: "Pull Up", sets: [{ weight: "bodyweight", reps: "5", rpe: "7" }] },
                {cantidadseries:3, name: "Overhead Press", sets: [{ weight: "40", reps: "8", rpe: "6" }] }
            ]
        },
        {
            id: 2,
            routineName: "Rutina de Fuerza 2",
            date: "2024-01-15",
            duration: "1h 15m",
            exercises: [
                {cantidadseries:3, name: "Deadlift", sets: [{ weight: "120", reps: "3", rpe: "9" }] },
                {cantidadseries:3, name: "Overhead Press", sets: [{ weight: "50", reps: "6", rpe: "7" }] },
                {cantidadseries:3, name: "Leg Press", sets: [{ weight: "200", reps: "8", rpe: "8" }] },
                {cantidadseries:3, name: "Lunges", sets: [{ weight: "40", reps: "10", rpe: "7" }] },
                {cantidadseries:3, name: "Bench Dips", sets: [{ weight: "bodyweight", reps: "8", rpe: "6" }] }
            ]
        },
        {
            id: 3,
            routineName: "Rutina de Resistencia",
            date: "2024-02-20",
            duration: "1h 45m",
            exercises: [
                {cantidadseries:3, name: "Correr", sets: [{ weight: "0", reps: "30min", rpe: "6" }] },
                {cantidadseries:3, name: "Ciclismo", sets: [{ weight: "0", reps: "45min", rpe: "7" }] },
                {cantidadseries:3, name: "Remo", sets: [{ weight: "0", reps: "20min", rpe: "7" }] },
                {cantidadseries:3, name: "Elíptica", sets: [{ weight: "0", reps: "25min", rpe: "6" }] },
                {cantidadseries:3, name: "Saltos", sets: [{ weight: "0", reps: "10min", rpe: "8" }] }
            ]
        },
        {
            id: 4,
            routineName: "Rutina de CrossFit",
            date: "2024-03-01",
            duration: "2h",
            exercises: [
                {cantidadseries:2000, name: "Burpees", sets: [{ weight: "0", reps: "50", rpe: "8" }] },
                {cantidadseries:3, name: "Kettlebell Swing", sets: [{ weight: "24", reps: "30", rpe: "7" }] },
                {cantidadseries:3, name: "Box Jump", sets: [{ weight: "0", reps: "20", rpe: "8" }] },
                {cantidadseries:3, name: "Wall Ball", sets: [{ weight: "9", reps: "25", rpe: "6" }] },
                {cantidadseries:3, name: "Thruster", sets: [{ weight: "30", reps: "15", rpe: "7" }] }
            ]
        }
    ];
    displaySessions();
}

function calculateTotalWeight(exercises) {
    return exercises.reduce((total, exercise) => {
        return total + exercise.sets.reduce((exerciseTotal, set) => {
            const weight = set.weight === "bodyweight" ? 0 : parseFloat(set.weight);
            return exerciseTotal + (weight * parseInt(set.reps));
        }, 0);
    }, 0);
}

function findBestSet(sets) {
    return sets.reduce((best, set) => {
        const totalWeight = parseFloat(set.weight) * parseInt(set.reps);
        if (!best || totalWeight > (parseFloat(best.weight) * parseInt(best.reps))) {
            return set;
        }
        return best;
    }, null);
}
function displaySessions() {
    const sessionList = document.getElementById("sessionList");
    sessionList.innerHTML = "";

    sessions.forEach(session => {
        const card = document.createElement("div");
        card.classList.add("session-card");

        const totalWeight = calculateTotalWeight(session.exercises);

        card.innerHTML = `
            <h3>${session.routineName}</h3>
            <p>${session.date}</p>
            <p>
                <strong>
                    <i class="fa-solid fa-weight-hanging" style="color: white; font-size: 16px; margin-right: 5px;"></i> 
                    Peso Total Levantado:
                </strong> 
                ${totalWeight} kg
            </p>
            <h4 style="display: flex; justify-content: space-between;">
                Ejercicios
                <span class="subtitle">Mejor Serie</span>
            </h4>
            <div class="exercises">
                ${session.exercises.map(exercise => {
                    const bestSet = findBestSet(exercise.sets);
                    return `
                        <div class="exercise-row">
                            <p class="exercise-info">${exercise.cantidadseries} x ${exercise.name}: ${exercise.sets.map(set => `${set.reps}x ${set.weight} kg`).join(", ")}</p>
                            <p class="best-set">
                                ${bestSet ? `${bestSet.reps} reps, ${bestSet.weight} kg, RPE: ${bestSet.rpe}` : ""}
                            </p>
                        </div>
                    `;
                }).join("")}
            </div>
            <div class="button-group">
            <button onclick="viewSession(${session.id})">Ver</button>
                <button onclick="deleteSession(${session.id})">Eliminar</button>
            </div>
        `;
        sessionList.appendChild(card);
    });
}
function viewSession(id) {
    const session = sessions.find(s => s.id === id);
    if (session) {
        alert(`Detalles de la rutina:\nNombre: ${session.routineName}\nFecha: ${session.date}\nDuración: ${session.duration}`);
    }
}





function addSession() {
    const newSession = {
        id: sessions.length + 1,
        routineName: "Nueva Rutina",
        date: new Date().toISOString().split("T")[0],
        duration: "0h 0m",
        exercises: []
    };

    sessions.push(newSession);
    displaySessions();
}

function deleteSession(id) {
    sessions = sessions.filter(s => s.id !== id);
    displaySessions();
}

// Inicializa la aplicación
init();
