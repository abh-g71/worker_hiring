document.getElementById("workerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Worker registered successfully!");
  this.reset();
});
