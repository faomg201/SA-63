package schema

import (
    "github.com/facebook/ent"
    "github.com/facebook/ent/schema/field"
    "github.com/facebook/ent/schema/edge"
)

// FOODMENU holds the schema definition for the FOODMENU entity.
type FOODMENU struct {
	ent.Schema
}

// Fields of the FOODMENU.
func (FOODMENU) Fields() []ent.Field {
	return []ent.Field{
		field.String("FOODMENU_NAME").Unique(),
	}
}

// Edges of the FOODMENU.
func (FOODMENU) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("FOODMENURECORD",Recordfood.Type),
	}
}