// Simulated role check — replace with actual check from localStorage/session
  const isPremiumUser = localStorage.getItem("user_role") === "premium";

  const premiumLink = document.getElementById("nav-premium");

  if (isPremiumUser) {
    premiumLink.href = "premium-dashboard.html";
  } else {
    premiumLink.href = "upgrade-premium.html";
  }



  // Show onboarding only once per device/user
  window.onload = function() {
    if (!localStorage.getItem("onboardingShown")) {
      document.getElementById("onboardingTips").style.display = "flex";
    }
  }

  function closeOnboarding() {
    document.getElementById("onboardingTips").style.display = "none";
    localStorage.setItem("onboardingShown", true);
  }
