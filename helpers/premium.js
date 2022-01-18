
const isPremium = (user) => {
  if (!user?.premiumEndingDate) {
    return false
    }
  const premiumDate = new Date(user?.premiumEndingDate || "");
  const today = new Date();
  return premiumDate > today
}

export {isPremium}
