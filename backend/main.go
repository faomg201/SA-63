package main

import (
	"context"
	"log"

	"github.com/faomg201/app/controllers"
	_ "github.com/faomg201/app/docs"
	"github.com/faomg201/app/ent"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Users struct {
	User []User
}

type User struct {
	USERNAME  string
	USEREMAIL string
}

type Foodmenus struct {
	Foodmenu []Foodmenu
}

type Foodmenu struct {
	FOODMENUNAME string
}

type Mainingres struct {
	Mainingre []Mainingre
}

type Mainingre struct {
	MAININGREDIENTNAME string
}

type Sources struct {
	Source []Source
}

type Source struct {
	SOURCENAME    string
	SOURCEADDRESS string
	SOURCETLE     string
}

// @title SUT SA Example API
// @version 1.0
// @description This is a sample server for SUT SE 2563
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationUrl https://example.com/oauth/authorize
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationUrl https://example.com/oauth/authorize
// @scope.admin Grants read and write access to administrative information
func main() {
	router := gin.Default()
	router.Use(cors.Default())

	client, err := ent.Open("sqlite3", "file:ent.db?cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("fail to open sqlite3: %v", err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	v1 := router.Group("/api/v1")
	controllers.NewUserController(v1, client)
	controllers.NewSourceController(v1, client)
	controllers.NewRecordfoodController(v1, client)
	controllers.NewMainingreController(v1, client)
	controllers.NewFOODMENUController(v1, client)

	// Set Users Data
	users := Users{
		User: []User{
			User{"Chanwit Kaewkasi", "chanwit@gmail.com"},
			User{"Name Surname", "me@example.com"},
		},
	}

	for _, u := range users.User {
		client.User.
			Create().
			SetUSERNAME(u.USERNAME).
			SetUSEREMAIL(u.USEREMAIL).
			Save(context.Background())
	}

	// Set Foodmenus Data
	foodmenus := Foodmenus{
		Foodmenu: []Foodmenu{
			Foodmenu{"ราดหน้า"},
			Foodmenu{"ผัดกระเพรา"},
			Foodmenu{"ก๋วยเตี๋ยว"},
		},
	}

	for _, f := range foodmenus.Foodmenu {
		client.FOODMENU.
			Create().
			SetFOODMENUNAME(f.FOODMENUNAME).
			Save(context.Background())
	}

	// Set Mainingres Data
	mainingres := Mainingres{
		Mainingre: []Mainingre{
			Mainingre{"หมู"},
			Mainingre{"กุ้ง"},
			Mainingre{"ไก่"},
			Mainingre{"ทะเล"},
		},
	}

	for _, m := range mainingres.Mainingre {
		client.Mainingre.
			Create().
			SetMAININGREDIENTNAME(m.MAININGREDIENTNAME).
			Save(context.Background())
	}

	// Set Sources Data
	sources := Sources{
		Source: []Source{
			Source{"ร้านพี่กุ้ง", "123 ถนน...", "0871111111"},
			Source{"ร้านอิ่มอร่อย", "114 ถนน...", "0935111111"},
		},
	}

	for _, s := range sources.Source {
		client.Source.
			Create().
			SetSOURCENAME(s.SOURCENAME).
			SetSOURCEADDRESS(s.SOURCEADDRESS).
			SetSOURCETLE(s.SOURCETLE).
			Save(context.Background())
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run()
}
