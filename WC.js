(function () {
    let tmpl_popup = document.createElement("template");
    tmpl_popup.innerHTML = `<div>
    <canvas id="myChart"></canvas>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <script>
    const ctx = document.getElementById('myChart');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>`;

    class Visuals extends HTMLElement {
      constructor() {
        super();
        window.globalThis = this;
        this.init();
      }
      init() {
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tmpl_popup.content.cloneNode(true));
        this.addEventListener("click", (event) => {
          var event = new Event("onClick");
          this.fireChanged();
          this.dispatchEvent(event);
        });
        window.document.addEventListener("keydown", function (event) {
          if (event.ctrlKey && event.key === "p" && event.altKey) {
            
            console.log("Pop Up Opened.");
            let popup = tmpl_popup.content.cloneNode(true);
            // this.shadowRoot.appendChild(popup);
            var Script = document.createElement("script");
            Script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
            // this.shadowRoot.appendChild(Script);
            let globalView = document.getElementsByClassName(
              "sapHcsShellMainContent"
            )[0];
            let cw = document.getElementsByClassName(
              "sapCustomWidgetWebComponent"
            )[0];
            let parentPanel = cw.parentNode.parentNode.parentNode;
            globalView.appendChild(parentPanel);
            globalView.appendChild(Script);
            parentPanel.style.zIndex = "99";
            parentPanel.style.height = "500px";
            parentPanel.style.width = "500px";
          }});
    customElements.define("cw-simplified", Visuals);
 }
 }})();
  
