package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/faomg201/app/ent"
	"github.com/faomg201/app/ent/source"
	"github.com/gin-gonic/gin"
)

// SourceController defines the struct for the source controller
type SourceController struct {
	client *ent.Client
	router gin.IRouter
}

// CreateSource handles POST requests for adding source entities
// @Summary Create source
// @Description Create source
// @ID create-source
// @Accept   json
// @Produce  json
// @Param source body ent.Source true "Source entity"
// @Success 200 {object} ent.Source
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /sources [post]
func (ctl *SourceController) CreateSource(c *gin.Context) {
	obj := ent.Source{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "source binding failed",
		})
		return
	}

	u, err := ctl.client.Source.
		Create().
		SetSOURCENAME(obj.SOURCENAME).
		SetSOURCEADDRESS(obj.SOURCEADDRESS).
		SetSOURCETLE(obj.SOURCETLE).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, u)
}

// GetSource handles GET requests to retrieve a source entity
// @Summary Get a source entity by ID
// @Description get source by ID
// @ID get-source
// @Produce  json
// @Param id path int true "Source ID"
// @Success 200 {object} ent.Source
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /sources/{id} [get]
func (ctl *SourceController) GetSource(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	u, err := ctl.client.Source.
		Query().
		Where(source.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, u)
}

// ListSource handles request to get a list of source entities
// @Summary List source entities
// @Description list source entities
// @ID list-source
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Source
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /sources [get]
func (ctl *SourceController) ListSource(c *gin.Context) {
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

	sources, err := ctl.client.Source.
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

	c.JSON(200, sources)
}

// DeleteSource handles DELETE requests to delete a source entity
// @Summary Delete a source entity by ID
// @Description get source by ID
// @ID delete-source
// @Produce  json
// @Param id path int true "Source ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /sources/{id} [delete]
func (ctl *SourceController) DeleteSource(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Source.
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

// UpdateSource handles PUT requests to update a source entity
// @Summary Update a source entity by ID
// @Description update source by ID
// @ID update-source
// @Accept   json
// @Produce  json
// @Param id path int true "Source ID"
// @Param source body ent.Source true "Source entity"
// @Success 200 {object} ent.Source
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /sources/{id} [put]
func (ctl *SourceController) UpdateSource(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Source{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "source binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Source.
		UpdateOneID(int(id)).
		SetSOURCENAME(obj.SOURCENAME).
		SetSOURCEADDRESS(obj.SOURCEADDRESS).
		SetSOURCETLE(obj.SOURCETLE).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewSourceController creates and registers handles for the source controller
func NewSourceController(router gin.IRouter, client *ent.Client) *SourceController {
	uc := &SourceController{
		client: client,
		router: router,
	}

	uc.register()

	return uc

}

func (ctl *SourceController) register() {
	sources := ctl.router.Group("/sources")

	sources.GET("", ctl.ListSource)

	// CRUD
	sources.POST("", ctl.CreateSource)
	sources.GET(":id", ctl.GetSource)
	sources.PUT(":id", ctl.UpdateSource)
	sources.DELETE(":id", ctl.DeleteSource)
}
