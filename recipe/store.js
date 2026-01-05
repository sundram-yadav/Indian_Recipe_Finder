// ===== LOAD SAVED RECIPES =====
let savedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

// ===== SHOW SAVED RECIPES ON PAGE LOAD =====
window.onload = function () {
    renderSavedRecipes();
};

// ===== SAVE RECIPE =====
function saveRecipe(recipe) {
    savedRecipes.push(recipe);
    localStorage.setItem("userRecipes", JSON.stringify(savedRecipes));
}

// ===== DISPLAY USER RECIPES =====
function renderSavedRecipes() {
    const container = document.getElementById("uploadedRecipes");
    if (!container) return;

    container.innerHTML = "";

    savedRecipes.forEach(r => {
        container.innerHTML += `
        <br>
        <center>
            <table border="3" bgcolor="#F0FFF0" width="70%" cellpadding="10">
                <tr bgcolor="#2E8B57">
                    <td colspan="2">
                        <center><h3><font color="white">${r.name}</font></h3></center>
                    </td>
                </tr>
                <tr><td width="30%"><b>Author:</b></td><td>${r.author}</td></tr>
                <tr><td><b>City:</b></td><td>${r.city}</td></tr>
                <tr><td><b>Time:</b></td><td>${r.time}</td></tr>
                <tr><td><b>Type:</b></td><td>${r.type}</td></tr>
                <tr>
                    <td valign="top"><b>Ingredients:</b></td>
                    <td>${r.ingredients.replace(/\n/g, "<br>")}</td>
                </tr>
                <tr>
                    <td valign="top"><b>Instructions:</b></td>
                    <td>${r.instructions.replace(/\n/g, "<br>")}</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <center><i>${r.tags}</i></center>
                    </td>
                </tr>
            </table>
        </center>
        `;
    });
}

// ===== HOOK INTO EXISTING UPLOAD FLOW =====
(function () {
    const originalUpload = window.uploadRecipe;

    window.uploadRecipe = function (event) {
        originalUpload(event);

        const lastRecipe = recipes[recipes.length - 1];
        saveRecipe(lastRecipe);
        renderSavedRecipes();
    };
})();
