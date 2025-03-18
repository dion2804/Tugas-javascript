document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const resultDiv = document.getElementById("result");
    let choicesArray = [];

    // Form input nama dan jumlah pilihan
    const formDiv = document.createElement("div");
    formDiv.innerHTML = `
        <label for="nama">Nama:</label>
        <input type="text" id="nama" required>
        <br>
        <label for="jumlah">Jumlah Pilihan:</label>
        <input type="number" id="jumlah" min="1" required>
        <br>
        <button id="okButton">OK</button>
    `;
    container.appendChild(formDiv);

    const choicesDiv = document.createElement("div");
    container.appendChild(choicesDiv);
    
    const selectionContainer = document.createElement("div");
    selectionContainer.style.display = "none";
    selectionContainer.innerHTML = `
        <label for="selection">Pilih salah satu:</label>
        <select id="selection"></select>
        <br>
        <button id="submitButton">Submit</button>
    `;
    container.appendChild(selectionContainer);

    document.getElementById("okButton").addEventListener("click", function() {
        let jumlah = document.getElementById("jumlah").value;
        let nama = document.getElementById("nama").value;

        if (jumlah <= 0 || nama.trim() === "") {
            alert("Harap isi nama dan jumlah pilihan dengan benar!");
            return;
        }
        
        // Menonaktifkan input nama dan jumlah pilihan
        document.getElementById("nama").disabled = true;
        document.getElementById("jumlah").disabled = true;
        
        // Menghilangkan tombol OK
        this.style.display = "none";

        choicesDiv.innerHTML = "";
        choicesArray = [];
        
        for (let i = 0; i < jumlah; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Teks Pilihan ${i + 1}`;
            input.required = true;
            choicesDiv.appendChild(input);
            choicesDiv.appendChild(document.createElement("br"));
        }

        let submitChoicesButton = document.createElement("button");
        submitChoicesButton.textContent = "Submit";
        submitChoicesButton.addEventListener("click", generateSelection);
        submitChoicesButton.id = "submitChoicesButton";
        choicesDiv.appendChild(submitChoicesButton);
    });

    function generateSelection() {
        let inputs = choicesDiv.querySelectorAll("input[type='text']");

        choicesArray = [];

        for (let input of inputs) {
            if (input.value.trim() === "") {
                alert("Semua pilihan harus diisi!");
                return;
            }
            choicesArray.push(input.value.trim());
            input.disabled = true; // Menonaktifkan input setelah submit
        }

        let selection = document.getElementById("selection");
        selection.innerHTML = "";

        choicesArray.forEach(choice => {
            let option = document.createElement("option");
            option.value = choice;
            option.textContent = choice;
            selection.appendChild(option);
        });

        selectionContainer.style.display = "block";

        // Menghilangkan tombol submit pilihan
        document.getElementById("submitChoicesButton").remove();
    }

    document.getElementById("submitButton").addEventListener("click", function() {
        let nama = document.getElementById("nama").value;
        let jumlah = document.getElementById("jumlah").value;
        let pilihanTerpilih = document.getElementById("selection").value;
    
        if (!pilihanTerpilih) {
            alert("Pilih salah satu opsi!");
            return;
        }
    
        
    
        
        let resultText = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan yaitu ${choicesArray.join(", ")}, dan saya memilih ${pilihanTerpilih}.`;
        
        resultDiv.innerHTML = `<p>${resultText}</p>`;
        
        // Menonaktifkan dropdown pilihan setelah submit
        document.getElementById("selection").disabled = true;

        // Menghilangkan tombol submit terakhir
        document.getElementById("submitButton").remove();
    });
});
