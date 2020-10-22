package schema

import (
    "github.com/facebook/ent"
    "github.com/facebook/ent/schema/field"
    "github.com/facebook/ent/schema/edge"
)

// Mainingre holds the schema definition for the Mainingre entity.
type Mainingre struct {
	ent.Schema
}

// Fields of the Mainingre.
func (Mainingre) Fields() []ent.Field {
	return []ent.Field{
		field.String("MAIN_INGREDIENT_NAME").Unique(),
	}
}

// Edges of the Mainingre.
func (Mainingre) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("MAININGRERECORD",Recordfood.Type),
	}
}
