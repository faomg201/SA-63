package schema

import (
    "github.com/facebook/ent"
    "github.com/facebook/ent/schema/field"
    "github.com/facebook/ent/schema/edge"
)

// Source holds the schema definition for the Source entity.
type Source struct {
	ent.Schema
}

// Fields of the Source.
func (Source) Fields() []ent.Field {
	return []ent.Field{
		field.String("SOURCE_NAME"),
		field.String("SOURCE_ADDRESS"),
		field.String("SOURCE_TLE"),
	}
}

// Edges of the Source.
func (Source) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("SOURCERECORD",Recordfood.Type),
	}
}
