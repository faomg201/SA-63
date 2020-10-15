package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/faomg201/app/ent"
	"github.com/faomg201/app/ent/foodmenu"
	"github.com/gin-gonic/gin"
)

// FOODMENUController defines the struct for the foodmenu controller
type FOODMENUController struct {
	client *ent.Client
	router gin.IRouter
}

// CreateFOODMENU handles POST requests for adding foodmenu entities
// @Summary Create foodmenu
// @Description Create foodmenu
// @ID create-foodmenu
// @Accept   json
// @Produce  json
// @Param foodmenu body ent.FOODMENU true "FOODMENU entity"
// @Success 200 {object} ent.FOODMENU
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /foodmenus [post]
func (ctl *FOODMENUController) CreateFOODMENU(c *gin.Context) {
	obj := ent.FOODMENU{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "foodmenu binding failed",
		})
		return
	}

	u, err := ctl.client.FOODMENU.
		Create().
		SetFOODMENUNAME(obj.FOODMENUNAME).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, u)
}

// GetFOODMENU handles GET requests to retrieve a foodmenu entity
// @Summary Get a foodmenu entity by ID
// @Description get foodmenu by ID
// @ID get-foodmenu
// @Produce  json
// @Param id path int true "FOODMENU ID"
// @Success 200 {object} ent.FOODMENU
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /foodmenus/{id} [get]
func (ctl *FOODMENUController) GetFOODMENU(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	u, err := ctl.client.FOODMENU.
		Query().
		Where(foodmenu.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, u)
}

// ListFOODMENU handles request to get a list of foodmenu entities
// @Summary List foodmenu entities
// @Description list foodmenu entities
// @ID list-foodmenu
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.FOODMENU
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /foodmenus [get]
func (ctl *FOODMENUController) ListFOODMENU(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {
			limit = int(limit64)
		}
	}

	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {
			offset = int(offset64)
		}
	}

	foodmenus, err := ctl.client.FOODMENU.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, foodmenus)
}

// DeleteFOODMENU handles DELETE requests to delete a foodmenu entity
// @Summary Delete a foodmenu entity by ID
// @Description get foodmenu by ID
// @ID delete-foodmenu
// @Produce  json
// @Param id path int true "FOODMENU ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /foodmenus/{id} [delete]
func (ctl *FOODMENUController) DeleteFOODMENU(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.FOODMENU.
		DeleteOneID(int(id)).
		Exec(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{"result": fmt.Sprintf("ok deleted %v", id)})
}

// UpdateFOODMENU handles PUT requests to update a foodmenu entity
// @Summary Update a foodmenu entity by ID
// @Description update foodmenu by ID
// @ID update-foodmenu
// @Accept   json
// @Produce  json
// @Param id path int true "FOODMENU ID"
// @Param foodmenu body ent.FOODMENU true "FOODMENU entity"
// @Success 200 {object} ent.FOODMENU
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /foodmenus/{id} [put]
func (ctl *FOODMENUController) UpdateFOODMENU(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.FOODMENU{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "foodmenu binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.FOODMENU.
		UpdateOneID(int(id)).
		SetFOODMENUNAME(obj.FOODMENUNAME).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewFOODMENUController creates and registers handles for the foodmenu controller
func NewFOODMENUController(router gin.IRouter, client *ent.Client) *FOODMENUController {
	uc := &FOODMENUController{
		client: client,
		router: router,
	}

	uc.register()

	return uc

}

func (ctl *FOODMENUController) register() {
	foodmenus := ctl.router.Group("/foodmenus")

	foodmenus.GET("", ctl.ListFOODMENU)

	// CRUD
	foodmenus.POST("", ctl.CreateFOODMENU)
	foodmenus.GET(":id", ctl.GetFOODMENU)
	foodmenus.PUT(":id", ctl.UpdateFOODMENU)
	foodmenus.DELETE(":id", ctl.DeleteFOODMENU)
}
