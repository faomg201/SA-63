package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/faomg201/app/ent"
	"github.com/faomg201/app/ent/foodmenu"
	"github.com/faomg201/app/ent/mainingre"
	"github.com/faomg201/app/ent/source"
	"github.com/faomg201/app/ent/user"
	"github.com/gin-gonic/gin"
)

//RecordfoodController struct
type RecordfoodController struct {
	client *ent.Client
	router gin.IRouter
}

//Recordfood struct
type Recordfood struct {
	RecordUSER       int
	RecordFOODMENU   int
	RecordINGREDIENT int
	RecordSOURCE     int
}

// CreateRecordfood handles POST requests for adding recordfood entities
// @Summary Create recordfood
// @Description Create recordfood
// @ID create-recordfood
// @Accept   json
// @Produce  json
// @Param recordfood body Recordfood true "Recordfood entity"
// @Success 200 {object} ent.Recordfood
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /recordfoods [post]
func (ctl *RecordfoodController) CreateRecordfood(c *gin.Context) {
	obj := Recordfood{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "recordfood binding failed",
		})
		return
	}

	rs, err := ctl.client.Source.
		Query().
		Where(source.IDEQ(int(obj.RecordSOURCE))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "recordsource not found",
		})
		return
	}

	ri, err := ctl.client.Mainingre.
		Query().
		Where(mainingre.IDEQ(int(obj.RecordINGREDIENT))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "recordsource not found",
		})
		return
	}

	ru, err := ctl.client.User.
		Query().
		Where(user.IDEQ(int(obj.RecordUSER))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "recordsource not found",
		})
		return
	}

	rf, err := ctl.client.FOODMENU.
		Query().
		Where(foodmenu.IDEQ(int(obj.RecordFOODMENU))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "recordsource not found",
		})
		return
	}

	pv, err := ctl.client.Recordfood.
		Create().
		SetRECORDFOODMENU(rf).
		SetRECORDSOURCE(rs).
		SetRECORDINGREDIENT(ri).
		SetRECORDUSER(ru).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, pv)
}

// ListRecordfood handles request to get a list of recordfood entities
// @Summary List recordfood entities
// @Description list recordfood entities
// @ID list-recordfood
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Recordfood
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /recordfoods [get]
func (ctl *RecordfoodController) ListRecordfood(c *gin.Context) {
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

	recordfoods, err := ctl.client.Recordfood.
		Query().
		WithRECORDFOODMENU().
		WithRECORDINGREDIENT().
		WithRECORDSOURCE().
		WithRECORDUSER().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, recordfoods)
}

// DeleteRecordfood handles DELETE requests to delete a recordfood entity
// @Summary Delete a recordfood entity by ID
// @Description get recordfood by ID
// @ID delete-recordfood
// @Produce  json
// @Param id path int true "Recordfood ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /recordfoods/{id} [delete]
func (ctl *RecordfoodController) DeleteRecordfood(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Recordfood.
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

// NewRecordfoodController creates and registers handles for the recordfood controller
func NewRecordfoodController(router gin.IRouter, client *ent.Client) *RecordfoodController {
	pvc := &RecordfoodController{
		client: client,
		router: router,
	}

	pvc.register()

	return pvc

}

func (ctl *RecordfoodController) register() {
	recordfoods := ctl.router.Group("/recordfoods")

	recordfoods.POST("", ctl.CreateRecordfood)
	recordfoods.GET("", ctl.ListRecordfood)
	recordfoods.DELETE(":id", ctl.DeleteRecordfood)

}
