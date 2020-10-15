package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/faomg201/app/ent"
	"github.com/faomg201/app/ent/mainingre"
	"github.com/gin-gonic/gin"
)

// MainingreController defines the struct for the mainingre controller
type MainingreController struct {
	client *ent.Client
	router gin.IRouter
}

// CreateMainingre handles POST requests for adding mainingre entities
// @Summary Create mainingre
// @Description Create mainingre
// @ID create-mainingre
// @Accept   json
// @Produce  json
// @Param mainingre body ent.Mainingre true "Mainingre entity"
// @Success 200 {object} ent.Mainingre
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /mainingres [post]
func (ctl *MainingreController) CreateMainingre(c *gin.Context) {
	obj := ent.Mainingre{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "mainingre binding failed",
		})
		return
	}

	u, err := ctl.client.Mainingre.
		Create().
		SetMAININGREDIENTNAME(obj.MAININGREDIENTNAME).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, u)
}

// GetMainingre handles GET requests to retrieve a mainingre entity
// @Summary Get a mainingre entity by ID
// @Description get mainingre by ID
// @ID get-mainingre
// @Produce  json
// @Param id path int true "Mainingre ID"
// @Success 200 {object} ent.Mainingre
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /mainingres/{id} [get]
func (ctl *MainingreController) GetMainingre(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	u, err := ctl.client.Mainingre.
		Query().
		Where(mainingre.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, u)
}

// ListMainingre handles request to get a list of mainingre entities
// @Summary List mainingre entities
// @Description list mainingre entities
// @ID list-mainingre
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Mainingre
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /mainingres [get]
func (ctl *MainingreController) ListMainingre(c *gin.Context) {
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

	mainingres, err := ctl.client.Mainingre.
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

	c.JSON(200, mainingres)
}

// DeleteMainingre handles DELETE requests to delete a mainingre entity
// @Summary Delete a mainingre entity by ID
// @Description get mainingre by ID
// @ID delete-mainingre
// @Produce  json
// @Param id path int true "Mainingre ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /mainingres/{id} [delete]
func (ctl *MainingreController) DeleteMainingre(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Mainingre.
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

// UpdateMainingre handles PUT requests to update a mainingre entity
// @Summary Update a mainingre entity by ID
// @Description update mainingre by ID
// @ID update-mainingre
// @Accept   json
// @Produce  json
// @Param id path int true "Mainingre ID"
// @Param mainingre body ent.Mainingre true "Mainingre entity"
// @Success 200 {object} ent.Mainingre
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /mainingres/{id} [put]
func (ctl *MainingreController) UpdateMainingre(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Mainingre{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "mainingre binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Mainingre.
		UpdateOneID(int(id)).
		SetMAININGREDIENTNAME(obj.MAININGREDIENTNAME).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewMainingreController creates and registers handles for the mainingre controller
func NewMainingreController(router gin.IRouter, client *ent.Client) *MainingreController {
	uc := &MainingreController{
		client: client,
		router: router,
	}

	uc.register()

	return uc

}

func (ctl *MainingreController) register() {
	mainingres := ctl.router.Group("/mainingres")

	mainingres.GET("", ctl.ListMainingre)

	// CRUD
	mainingres.POST("", ctl.CreateMainingre)
	mainingres.GET(":id", ctl.GetMainingre)
	mainingres.PUT(":id", ctl.UpdateMainingre)
	mainingres.DELETE(":id", ctl.DeleteMainingre)
}
