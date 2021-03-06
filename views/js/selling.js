$(document).ready(() => {
  $(document).on("click", ".deleteBtn", deleteListing);
  $(document).on("click", ".updateBtn", updateListing);
  $(document).on("submit", "#submitUpdate", submitUpdatedListing);
  $(document).on("click", "#closeModal", closeModal);
  $(document).on("click", "#home", takeMeHome);
  $(document).on("submit", "#submitSell", submitListing);

  function submitListing(event) {
    event.preventDefault();
    const newItemToSell = {
      item: $(".item")
        .val()
        .trim(),
      description: $(".description")
        .val()
        .trim(),
      category: $(".category")
        .val()
        .trim(),
      price: $(".price")
        .val()
        .trim(),
      seller: $(".member-name").text()
    };
    if (
      !newItemToSell.item ||
      !newItemToSell.description ||
      !newItemToSell.category ||
      !newItemToSell.price
    ) {
      alert("Boxes can't be empty!");
    } else {
      $.ajax("/api/selling", {
        type: "POST",
        data: newItemToSell
      }).then(() => {
        window.location.reload();
      });
    }
  }

  function deleteListing() {
    const listingId = $(this)
      .parent()
      .data().id;
    // console.log(listingId);
    $.ajax({
      method: "DELETE",
      url: `/api/selling/${listingId}`
    }).then(() => {
      window.location.reload();
    });
  }

  function updateListing() {
    const listingId = $(this)
      .parent()
      .data().id;
    const listingItem = $(this)
      .prev()
      .prev()
      .prev()
      .prev()
      .text();
    const listingDescription = $(this)
      .prev()
      .prev()
      .prev()
      .text();
    const listingPrice = $(this)
      .prev()
      .prev()
      .text();

    const listingCategory = $(this)
      .prev()
      .text();

    let modalListingPrice = "";
    for (let i = 1; i < listingPrice.length; i++) {
      modalListingPrice += listingPrice[i];
    }

    let modalListingCategory = "";
    for (let i = 10; i < listingCategory.length; i++) {
      modalListingCategory += listingCategory[i];
    }

    $(".modal").addClass("is-active");

    $("#submitUpdate").attr("data-id", listingId);
    $("#newItem").val(listingItem);
    $("#newDescription").val(listingDescription);
    $("#newPrice").val(modalListingPrice);
    $("#newCategory").val(modalListingCategory);
  }

  function submitUpdatedListing(event) {
    event.preventDefault();

    const listingId = $("#submitUpdate").data().id;

    const newItem = $("#newItem")
      .val()
      .trim();
    const newDescription = $("#newDescription")
      .val()
      .trim();
    const newPrice = $("#newPrice")
      .val()
      .trim();

    const newCategory = $("#newCategory").val();

    const newItemInfo = {
      item: newItem,
      description: newDescription,
      price: newPrice,
      category: newCategory
    };

    $.ajax(`/api/listings/${listingId}`, {
      type: "PUT",
      data: newItemInfo
    }).then(() => {
      window.location.reload();
    });
  }

  function closeModal() {
    $(".modal").removeClass("is-active");
  }

  function takeMeHome() {
    window.location.replace("/home");
  }
});
