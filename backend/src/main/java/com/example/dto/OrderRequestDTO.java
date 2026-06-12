package com.example.dto;

public class OrderRequestDTO {

<<<<<<< HEAD
    private Long customerID;
=======
    private int orderID;
    private Integer customerID;
>>>>>>> origin/nari-final
    private String channel;
    private int totalAmount;
    private int quantity;
    private String sku;
    private int inventoryId;
    private String destination;   // NEW — where the order should be shipped/delivered to

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

<<<<<<< HEAD
    public int getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

    public Long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(Long customerID) {
        this.customerID = customerID;
    }
=======
    

    public Integer getCustomerID() {
		return customerID;
	}
>>>>>>> origin/nari-final

	public void setCustomerID(Integer customerID) {
		this.customerID = customerID;
	}

	public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }
}