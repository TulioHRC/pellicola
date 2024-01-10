const CSSnavBarButtonsSelect = (mainPageSelected: boolean) => {
    // Basic CSS change of NavBar buttons styles
    const mainPageButton = document.getElementById("mainPageButton");
    const libraryPageButton = document.getElementById("libraryPageButton");
    if(mainPageButton && libraryPageButton){
        mainPageButton.style.textDecoration = (mainPageSelected) ? "underline" : "none";
        libraryPageButton.style.textDecoration = (mainPageSelected) ? "none" : "underline";
    };
}

export default CSSnavBarButtonsSelect;