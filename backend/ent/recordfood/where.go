// Code generated by entc, DO NOT EDIT.

package recordfood

import (
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/faomg201/app/ent/predicate"
)

// ID filters vertices based on their identifier.
func ID(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.EQ(s.C(FieldID), id))
	})
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.NEQ(s.C(FieldID), id))
	})
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.In(s.C(FieldID), v...))
	})
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		// if not arguments were provided, append the FALSE constants,
		// since we can't apply "IN ()". This will make this predicate falsy.
		if len(ids) == 0 {
			s.Where(sql.False())
			return
		}
		v := make([]interface{}, len(ids))
		for i := range v {
			v[i] = ids[i]
		}
		s.Where(sql.NotIn(s.C(FieldID), v...))
	})
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.GT(s.C(FieldID), id))
	})
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.GTE(s.C(FieldID), id))
	})
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.LT(s.C(FieldID), id))
	})
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s.Where(sql.LTE(s.C(FieldID), id))
	})
}

// HasRECORDUSER applies the HasEdge predicate on the "RECORD_USER" edge.
func HasRECORDUSER() predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDUSERTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDUSERTable, RECORDUSERColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRECORDUSERWith applies the HasEdge predicate on the "RECORD_USER" edge with a given conditions (other predicates).
func HasRECORDUSERWith(preds ...predicate.User) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDUSERInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDUSERTable, RECORDUSERColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasRECORDFOODMENU applies the HasEdge predicate on the "RECORD_FOODMENU" edge.
func HasRECORDFOODMENU() predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDFOODMENUTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDFOODMENUTable, RECORDFOODMENUColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRECORDFOODMENUWith applies the HasEdge predicate on the "RECORD_FOODMENU" edge with a given conditions (other predicates).
func HasRECORDFOODMENUWith(preds ...predicate.FOODMENU) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDFOODMENUInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDFOODMENUTable, RECORDFOODMENUColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasRECORDINGREDIENT applies the HasEdge predicate on the "RECORD_INGREDIENT" edge.
func HasRECORDINGREDIENT() predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDINGREDIENTTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDINGREDIENTTable, RECORDINGREDIENTColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRECORDINGREDIENTWith applies the HasEdge predicate on the "RECORD_INGREDIENT" edge with a given conditions (other predicates).
func HasRECORDINGREDIENTWith(preds ...predicate.Mainingre) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDINGREDIENTInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDINGREDIENTTable, RECORDINGREDIENTColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasRECORDSOURCE applies the HasEdge predicate on the "RECORD_SOURCE" edge.
func HasRECORDSOURCE() predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDSOURCETable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDSOURCETable, RECORDSOURCEColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRECORDSOURCEWith applies the HasEdge predicate on the "RECORD_SOURCE" edge with a given conditions (other predicates).
func HasRECORDSOURCEWith(preds ...predicate.Source) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RECORDSOURCEInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, RECORDSOURCETable, RECORDSOURCEColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups list of predicates with the AND operator between them.
func And(predicates ...predicate.Recordfood) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups list of predicates with the OR operator between them.
func Or(predicates ...predicate.Recordfood) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Recordfood) predicate.Recordfood {
	return predicate.Recordfood(func(s *sql.Selector) {
		p(s.Not())
	})
}
