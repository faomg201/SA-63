package schema

import (
    "github.com/facebook/ent"
    "github.com/facebook/ent/schema/edge"
)
// Recordfood holds the schema definition for the Recordfood entity.
type Recordfood struct {
	ent.Schema
}
// Fields of the Recordfood.
func (Recordfood) Fields() []ent.Field {
	return nil
}
// Edges of the Recordfood.
func (Recordfood) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("RECORD_USER",User.Type).Ref("USERRECORD").Unique(),
		edge.From("RECORD_FOODMENU",FOODMENU.Type).Ref("FOODMENURECORD").Unique(),
		edge.From("RECORD_INGREDIENT",Mainingre.Type).Ref("MAININGRERECORD").Unique(),
		edge.From("RECORD_SOURCE",Source.Type).Ref("SOURCERECORD").Unique(),
	}
}
