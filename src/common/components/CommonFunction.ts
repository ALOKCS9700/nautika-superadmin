export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const nautika = require("../../assets/nautika-logo-2.png");
export const footerTop = require("../../assets/footer_top.png");
