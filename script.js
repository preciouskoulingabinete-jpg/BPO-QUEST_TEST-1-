let scores = { EmployeeOfTheMonth: 0, TiredRetiree: 0, ConfusedNewbie: 0, AnxiousNewbie: 0 };
const personaImages = {
  EmployeeOfTheMonth: "images/employee-of-the-month.jpg",
  TiredRetiree: "images/tired-retiree.jpg",
  ConfusedNewbie: "images/confused-newbie.jpg",
  AnxiousNewbie: "images/anxious-newbie.jpg"
};
const customerVisuals = {
  Maya: {
    defaultExpression: "neutral",
    images: {
      neutral: "images/maya-neutral.png",
      concerned: "images/maya-concerned.png",
      frustrated: "",
      relieved: "images/maya-relieved.png"
    }
  },
  Rina: {
    defaultExpression: "frustrated",
    images: { neutral: "", concerned: "", frustrated: "", relieved: "" }
  },
  Jordan: {
    defaultExpression: "concerned",
    images: { neutral: "", concerned: "", frustrated: "", relieved: "" }
  }
};
let currentCustomerExpressions = {};

let scenes = [
  { type: "dialogue", 
    text: "BPO QUEST: Customer Service Simulator",  
    buttonText: "Enter",
    sound: "sounds/blip.mp3",
    isTitle: true
  },

  { type: "dialogue", 
    text: "Curious about what kind of employee you are?", 
    fadeIn: true,
    buttonText: "Yes!",
    sound: "sounds/blip.mp3"
   },

  { type: "dialogue", 
    text: "Great! The way you respond will lead to different outcomes. Exciting, isn't it?",
    sound: "sounds/blip.mp3"
    },

  { type: "dialogue", 
    text: "Just answer with which you think resonates most with you. Have fun!",
    sound: "sounds/blip.mp3"
  },

  { type: "question", customer: "Maya", text: "Maya calls because her delivery is a day late. She sounds calm and asks if you can check on it. What do you do first?", options: [
    { text: "Check the order, explain the latest tracking update, and offer a clear next step.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Maya reassured.
    { text: "Look up the tracking status and give her a straightforward update.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Maya neutral and listening.
    { text: "Ask a teammate where to find the delivery status, while letting Maya know you are checking.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Maya patient, waiting.
    { text: "Confirm the order number and check with your lead before explaining the status.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Maya slightly concerned.
  ]},
  { type: "question", customer: "Maya", text: "The tracking page says the package is still moving, but it gives no new delivery date. What do you tell Maya?", options: [
    { text: "Explain what the tracking does confirm, be honest about what is unknown, and offer a follow-up option.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Maya reassured by the clear plan.
    { text: "Tell her the package is still in transit and avoid guessing at a new date.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Maya calm, listening.
    { text: "Ask a teammate what wording to use when tracking has no updated date.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Maya waiting with a neutral expression.
    { text: "Check the delivery guidance with your lead so you do not promise the wrong date.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Maya attentive, slightly uncertain.
  ]},
  { type: "question", customer: "Maya", text: "Maya asks if you can change the delivery address, but the package may already be out for delivery. How do you respond?", options: [
    { text: "Check whether an address change is still allowed and explain the available alternatives.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Maya hopeful and reassured.
    { text: "Follow the address-change policy and tell her what can still be changed.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Maya attentive and calm.
    { text: "Ask a teammate to show you where address-change eligibility is checked.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Maya patient, waiting.
    { text: "Confirm the order and ask your lead to verify whether an address change is possible.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Maya concerned but patient.
  ]},
  { type: "question", customer: "Maya", text: "Maya says the package arrived, but the box is damaged. What is your next step?", options: [
    { text: "Apologize, ask about the item's condition, and explain the return or replacement options.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Maya relieved to hear options.
    { text: "Check the damage-claim process and walk her through the required steps.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Maya calm and focused.
    { text: "Ask a teammate which damage process applies before advising her.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Maya attentive, waiting.
    { text: "Review the policy and confirm with your lead before offering a replacement.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Maya reassured by careful checking.
  ]},
  { type: "question", customer: "Maya", text: "Before ending the call, Maya asks what will happen next. How do you wrap up?", options: [
    { text: "Summarize the agreed next step, its expected timing, and how she can follow up.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Maya relieved and appreciative.
    { text: "Repeat the main action and give her the standard follow-up information.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Maya satisfied and calm.
    { text: "Check your notes with a teammate, then recap the next step to Maya.", persona: "ConfusedNewbie", expression: "concerned" }, // Visual: Maya patient, then reassured.
    { text: "Read back your notes and confirm the next step with Maya before closing.", persona: "AnxiousNewbie", expression: "relieved" } // Visual: Maya reassured by the confirmation.
  ]},

  { type: "dialogue", text: "Next, Rina calls about being charged twice. She is furious and says she has already contacted support once.", image: "images/Sprite.gif", maxWidth: "175px", sound: "sounds/blip.mp3" },
  { type: "question", customer: "Rina", text: "Rina starts the call angrily: 'You charged me twice and nobody is fixing it!' How do you respond?", options: [
    { text: "Let her explain, acknowledge the impact, and say you will review the charges with her.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Rina heard and listening.
    { text: "Keep your voice steady, confirm the account, and begin checking the transactions.", persona: "TiredRetiree", expression: "frustrated" }, // Visual: Rina still frustrated.
    { text: "Tell her you want to help, then quietly ask your teammate how to locate duplicate charges.", persona: "ConfusedNewbie", expression: "frustrated" }, // Visual: Rina still frustrated, waiting.
    { text: "Apologize for the trouble and ask permission to place her on a brief hold to check with your lead.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Rina skeptical, but listening.
  ]},
  { type: "question", customer: "Rina", text: "Rina says she has explained this already and does not want to repeat everything. What do you do?", options: [
    { text: "Summarize what you have understood and ask only for the detail needed to verify the charge.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Rina beginning to feel heard.
    { text: "Check the previous case notes and ask her to confirm only the key account detail.", persona: "TiredRetiree", expression: "concerned" }, // Visual: Rina guarded, then attentive.
    { text: "Ask your teammate to help you find the earlier case notes while you explain the brief wait.", persona: "ConfusedNewbie", expression: "frustrated" }, // Visual: Rina impatient, waiting.
    { text: "Tell her you understand the repetition is frustrating and ask your lead to help locate the prior case.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Rina skeptical, easing slightly.
  ]},
  { type: "question", customer: "Rina", text: "You find two transactions, but one may be a temporary authorization. What do you say?", options: [
    { text: "Explain the difference plainly, verify the transaction status, and give a realistic timeline for the next update.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Rina cautiously reassured.
    { text: "Describe what the account shows and follow the billing process for confirming the charge.", persona: "TiredRetiree", expression: "concerned" }, // Visual: Rina listening, still wary.
    { text: "Ask your teammate to explain the authorization status so you can relay it accurately.", persona: "ConfusedNewbie", expression: "frustrated" }, // Visual: Rina doubtful and waiting.
    { text: "Avoid guessing; ask your lead to verify the transaction status before you explain it.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Rina concerned, but sees you checking.
  ]},
  { type: "question", customer: "Rina", text: "Rina interrupts: 'So are you refunding me or not?' You still need to confirm whether the charge settled. How do you handle it?", options: [
    { text: "Answer directly about what you know, explain what must be confirmed, and promise only a specific next update.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Rina calmer as expectations are clear.
    { text: "State that you need to confirm settlement before a refund decision and continue the check.", persona: "TiredRetiree", expression: "frustrated" }, // Visual: Rina impatient but listening.
    { text: "Ask your teammate which status determines refund eligibility before you answer.", persona: "ConfusedNewbie", expression: "frustrated" }, // Visual: Rina doubtful, waiting for a clear answer.
    { text: "Tell her you do not want to mislead her and ask your lead to confirm the refund rule.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Rina reassured by honesty.
  ]},
  { type: "question", customer: "Rina", text: "The charge is confirmed as a duplicate and a refund request is submitted. How do you close the call?", options: [
    { text: "Apologize, give the refund reference and expected timing, and check if she has another concern.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Rina visibly calmer and relieved.
    { text: "Give the refund timeline and reference, then confirm she understands the next step.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Rina calm, still serious.
    { text: "Ask a teammate to confirm the reference details, then repeat them clearly to Rina.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Rina calmer and attentive.
    { text: "Read back the refund details and ask your lead to verify the timeline before closing.", persona: "AnxiousNewbie", expression: "relieved" } // Visual: Rina calmer, reassured by the double-check.
  ]},

  { type: "dialogue", text: "Your last customer is Jordan. They sound overwhelmed by a bill and say the instructions are confusing.", image: "images/Sprite.gif", maxWidth: "175px", sound: "sounds/blip.mp3" },
  { type: "question", customer: "Jordan", text: "Jordan says, 'I don't understand this bill at all. I don't even know where to start.' What do you do?", options: [
    { text: "Reassure them, ask which part is most confusing, and explain one section at a time.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Jordan attentive.
    { text: "Ask which line they are looking at and give a short, plain-language explanation.", persona: "TiredRetiree", expression: "concerned" }, // Visual: Jordan confused but focused.
    { text: "Ask your teammate to point out the key bill sections, then guide Jordan through them.", persona: "ConfusedNewbie", expression: "concerned" }, // Visual: Jordan confused, waiting patiently.
    { text: "Slow down, check what Jordan already understands, and confirm each explanation before moving on.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Jordan worried, then reassured by the pace.
  ]},
  { type: "question", customer: "Jordan", text: "Jordan points to a fee they do not recognize. How do you explain it?", options: [
    { text: "Check the account details and explain what the fee is for in everyday language.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Jordan beginning to understand.
    { text: "Look up the fee description and give a concise explanation based on the account.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Jordan attentive and less confused.
    { text: "Ask a teammate where to verify the fee, then explain what you learn.", persona: "ConfusedNewbie", expression: "concerned" }, // Visual: Jordan listening, still uncertain.
    { text: "Verify the fee with your lead or reference guide before explaining it.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Jordan reassured by the verification.
  ]},
  { type: "question", customer: "Jordan", text: "Jordan asks you to repeat the explanation because they are still unsure. What do you do?", options: [
    { text: "Try a simpler explanation and ask them to tell you which part still feels unclear.", persona: "EmployeeOfTheMonth", expression: "neutral" }, // Visual: Jordan gradually understanding.
    { text: "Repeat the main point more slowly and check whether it answers their question.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Jordan attentive, starting to understand.
    { text: "Ask your teammate for a simpler way to explain it, then try that wording.", persona: "ConfusedNewbie", expression: "concerned" }, // Visual: Jordan patient, still puzzled.
    { text: "Break the explanation into smaller steps and pause after each one for confirmation.", persona: "AnxiousNewbie", expression: "relieved" } // Visual: Jordan calmer and more confident.
  ]},
  { type: "question", customer: "Jordan", text: "Jordan asks whether the fee can be removed. The policy is not clear to you. What do you do?", options: [
    { text: "Check the policy and account eligibility, then explain any available options without promising an exception.", persona: "EmployeeOfTheMonth", expression: "concerned" }, // Visual: Jordan hopeful and attentive.
    { text: "Use the standard fee-review process and explain what decision to expect.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Jordan calm, listening.
    { text: "Ask a teammate where the fee-review policy is documented before answering.", persona: "ConfusedNewbie", expression: "concerned" }, // Visual: Jordan uncertain, waiting.
    { text: "Tell Jordan you are checking the rule and confirm the answer with your lead.", persona: "AnxiousNewbie", expression: "concerned" } // Visual: Jordan reassured you are checking.
  ]},
  { type: "question", customer: "Jordan", text: "Before ending the call, Jordan wants to make sure they know what to do next month. How do you help?", options: [
    { text: "Summarize the key dates and actions, then ask Jordan to confirm the plan makes sense.", persona: "EmployeeOfTheMonth", expression: "relieved" }, // Visual: Jordan relieved and confident.
    { text: "Give a short recap of the next date and where to find the bill details.", persona: "TiredRetiree", expression: "neutral" }, // Visual: Jordan reassured and calm.
    { text: "Write down the steps with your teammate's guidance and read them back clearly.", persona: "ConfusedNewbie", expression: "neutral" }, // Visual: Jordan calmer, following along.
    { text: "Review the dates and steps slowly and ask Jordan if they want anything repeated.", persona: "AnxiousNewbie", expression: "relieved" } // Visual: Jordan relieved, feeling supported.
  ]}
];

let currentScene = 0;

const backgroundMusic = document.getElementById("background-music");
if (backgroundMusic) {
  backgroundMusic.volume = 0.25;

  const startMusicAfterInteraction = () => {
    document.removeEventListener("pointerdown", startMusicAfterInteraction);
    document.removeEventListener("keydown", startMusicAfterInteraction);
    backgroundMusic.play().catch(error => {
      console.error("Could not play background music:", error);
    });
  };

  backgroundMusic.play().catch(() => {
    document.addEventListener("pointerdown", startMusicAfterInteraction, { once: true });
    document.addEventListener("keydown", startMusicAfterInteraction, { once: true });
  });
}

const preloadImages = [
  "images/house.gif",
  "images/lynn.png",
  "images/Sprite.gif",
  "images/Sprite-2.gif"
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

function showScene() {
  let scene = scenes[currentScene];
  let textBox = document.getElementById("text-box");
  let buttonsDiv = document.getElementById("buttons");
  let container = document.getElementById("container");
  const firstQuestionIndex = scenes.findIndex(item => item.type === "question");
  container.classList.toggle("intro-active", currentScene < firstQuestionIndex);
  
  textBox.classList.remove("title-font", "question-font", "dialogue-scene");

  if (scene.isTitle) {
      textBox.classList.add("title-font");
  } else if (scene.type === "question") {
      textBox.classList.add("question-font");
  }

 if (scene.type === "dialogue" && !scene.isCreatorNote && !scene.isTitle) {
    textBox.classList.add("dialogue-scene");
}

  if (scene.type === "dialogue" && scene.isCreatorNote) {
      textBox.innerHTML = `<div class="creator-note">${scene.text}</div>`; // allow HTML
  } else {
      textBox.textContent = scene.text;
  }

  let imageDiv = document.getElementById("image");
  imageDiv.innerHTML = "";
    let imageSrc = scene.image;
    if (scene.type === "question" && scene.customer) {
      const visuals = customerVisuals[scene.customer];
      const expression = currentCustomerExpressions[scene.customer] || visuals.defaultExpression;
      imageSrc = visuals.images[expression];
    }
    if (imageSrc) {
      let img = document.createElement("img"); 
      img.src = imageSrc; // set the source
      img.alt = scene.customer ? `${scene.customer} (${currentCustomerExpressions[scene.customer] || customerVisuals[scene.customer].defaultExpression})` : "Scene illustration";
      img.style.maxWidth = scene.maxWidth || "300px"; 

      if (scene.fadeIn) {
          img.classList.add("fade-in");
          setTimeout(() => {
              img.classList.add("show");
          }, 10);
      }

      imageDiv.appendChild(img); 
  } 

  buttonsDiv.innerHTML = "";

  if (scene.type === "dialogue") {
      if (scene.buttons) {
          scene.buttons.forEach(label => {
              let btn = document.createElement("button");
              btn.textContent = label;
              btn.classList.add("dialogue-btn"); 
              btn.onclick = () => {
                  if (scene.sound) {
                      const audio = new Audio(scene.sound);
                      audio.currentTime = 0;
                      audio.play();
                  }
                  currentScene++;
                  showScene();
              };
              buttonsDiv.appendChild(btn);
          });
      } else {
          let btn = document.createElement("button");
          btn.textContent = scene.buttonText || "Next";
          btn.classList.add("dialogue-btn");
          btn.onclick = () => {
              if (scene.sound) {
                  const audio = new Audio(scene.sound);
                  audio.currentTime = 0;
                  audio.play();
              }
              currentScene++;
              showScene();
          };
          buttonsDiv.appendChild(btn);
      }
  } 
  else if (scene.type === "question") {
      const shuffledOptions = [...scene.options];
      for (let index = shuffledOptions.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffledOptions[index], shuffledOptions[swapIndex]] = [shuffledOptions[swapIndex], shuffledOptions[index]];
      }
      shuffledOptions.forEach(option => {
          let btn = document.createElement("button");
          btn.textContent = option.text;
          btn.classList.add("question-btn"); 
          btn.onclick = () => {
              buttonsDiv.querySelectorAll("button").forEach(button => button.disabled = true);
              scores[option.persona] += 1;
              currentCustomerExpressions[scene.customer] = option.expression;
              const customerImage = document.querySelector("#image img");
              const imageSrc = customerVisuals[scene.customer].images[option.expression];
              if (customerImage && imageSrc) {
                customerImage.src = imageSrc;
                customerImage.alt = `${scene.customer} (${option.expression})`;
              }

              currentScene++;
              if (currentScene >= scenes.length) {
                showResult();
              } else {
                showScene();
              }
          };
          buttonsDiv.appendChild(btn);
      });
  }
}



function showResult() {
  const textBox = document.getElementById("text-box");
  const container = document.getElementById("container");
  textBox.classList.add("results-active");
  container.classList.add("results-active");

  const buttonsDiv = document.getElementById("buttons");
  buttonsDiv.innerHTML = "";

  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;

  const topPersona = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const profiles = {
    EmployeeOfTheMonth: "Proactive, empathetic, and focused on taking ownership while following policy.",
    TiredRetiree: "Steady and experienced, with a practical approach to resolving requests efficiently.",
    ConfusedNewbie: "Curious and eager to learn, with a preference for clear guidance and practice.",
    AnxiousNewbie: "Careful and conscientious, with a preference for reassurance and checking the process."
  };
  const personaNames = {
    EmployeeOfTheMonth: "Employee of the Month",
    TiredRetiree: "Tired Retiree",
    ConfusedNewbie: "Confused Newbie",
    AnxiousNewbie: "Anxious Newbie"
  };
  textBox.innerHTML = `Your customer-service style: ${personaNames[topPersona]}<p class="result-description">${profiles[topPersona]}</p>`;

  const personaImage = document.createElement("img");
  personaImage.classList.add("persona-result");
  personaImage.src = personaImages[topPersona];
  personaImage.alt = personaNames[topPersona];
  buttonsDiv.appendChild(personaImage);

  const customerOutcomes = document.createElement("div");
  customerOutcomes.classList.add("customer-outcomes");
  Object.keys(customerVisuals).forEach(customer => {
    const expression = currentCustomerExpressions[customer] || customerVisuals[customer].defaultExpression;
    const imageSrc = customerVisuals[customer].images[expression];
    if (!imageSrc) return;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = `${customer} looks ${expression}`;
    const caption = document.createElement("figcaption");
    caption.textContent = `${customer}: ${expression}`;
    figure.append(img, caption);
    customerOutcomes.appendChild(figure);
  });
  buttonsDiv.appendChild(customerOutcomes);

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Back to Home";
  homeBtn.onclick = () => {
      overlay.style.opacity = 0;
      textBox.classList.remove("results-active");
      scores = { EmployeeOfTheMonth: 0, TiredRetiree: 0, ConfusedNewbie: 0, AnxiousNewbie: 0 };
      currentCustomerExpressions = {};
      currentScene = 0;
      showScene();
  };
  buttonsDiv.appendChild(homeBtn);

}



showScene();

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-description");
    const closeModal = document.getElementById("close-modal");

    if (!modal || !modalImg || !modalDesc || !closeModal) return;

    document.querySelectorAll(".cat-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = thumb.dataset.stat;
            modalDesc.textContent = thumb.dataset.description;
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);
setVh();