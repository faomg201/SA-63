// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/faomg201/app/ent/foodmenu"
	"github.com/faomg201/app/ent/recordfood"
)

// FOODMENUCreate is the builder for creating a FOODMENU entity.
type FOODMENUCreate struct {
	config
	mutation *FOODMENUMutation
	hooks    []Hook
}

// SetFOODMENUNAME sets the FOODMENU_NAME field.
func (fc *FOODMENUCreate) SetFOODMENUNAME(s string) *FOODMENUCreate {
	fc.mutation.SetFOODMENUNAME(s)
	return fc
}

// AddFOODMENURECORDIDs adds the FOODMENURECORD edge to Recordfood by ids.
func (fc *FOODMENUCreate) AddFOODMENURECORDIDs(ids ...int) *FOODMENUCreate {
	fc.mutation.AddFOODMENURECORDIDs(ids...)
	return fc
}

// AddFOODMENURECORD adds the FOODMENURECORD edges to Recordfood.
func (fc *FOODMENUCreate) AddFOODMENURECORD(r ...*Recordfood) *FOODMENUCreate {
	ids := make([]int, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return fc.AddFOODMENURECORDIDs(ids...)
}

// Mutation returns the FOODMENUMutation object of the builder.
func (fc *FOODMENUCreate) Mutation() *FOODMENUMutation {
	return fc.mutation
}

// Save creates the FOODMENU in the database.
func (fc *FOODMENUCreate) Save(ctx context.Context) (*FOODMENU, error) {
	var (
		err  error
		node *FOODMENU
	)
	if len(fc.hooks) == 0 {
		if err = fc.check(); err != nil {
			return nil, err
		}
		node, err = fc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*FOODMENUMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = fc.check(); err != nil {
				return nil, err
			}
			fc.mutation = mutation
			node, err = fc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(fc.hooks) - 1; i >= 0; i-- {
			mut = fc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, fc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (fc *FOODMENUCreate) SaveX(ctx context.Context) *FOODMENU {
	v, err := fc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// check runs all checks and user-defined validators on the builder.
func (fc *FOODMENUCreate) check() error {
	if _, ok := fc.mutation.FOODMENUNAME(); !ok {
		return &ValidationError{Name: "FOODMENU_NAME", err: errors.New("ent: missing required field \"FOODMENU_NAME\"")}
	}
	return nil
}

func (fc *FOODMENUCreate) sqlSave(ctx context.Context) (*FOODMENU, error) {
	_node, _spec := fc.createSpec()
	if err := sqlgraph.CreateNode(ctx, fc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (fc *FOODMENUCreate) createSpec() (*FOODMENU, *sqlgraph.CreateSpec) {
	var (
		_node = &FOODMENU{config: fc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: foodmenu.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: foodmenu.FieldID,
			},
		}
	)
	if value, ok := fc.mutation.FOODMENUNAME(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: foodmenu.FieldFOODMENUNAME,
		})
		_node.FOODMENUNAME = value
	}
	if nodes := fc.mutation.FOODMENURECORDIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   foodmenu.FOODMENURECORDTable,
			Columns: []string{foodmenu.FOODMENURECORDColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: recordfood.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// FOODMENUCreateBulk is the builder for creating a bulk of FOODMENU entities.
type FOODMENUCreateBulk struct {
	config
	builders []*FOODMENUCreate
}

// Save creates the FOODMENU entities in the database.
func (fcb *FOODMENUCreateBulk) Save(ctx context.Context) ([]*FOODMENU, error) {
	specs := make([]*sqlgraph.CreateSpec, len(fcb.builders))
	nodes := make([]*FOODMENU, len(fcb.builders))
	mutators := make([]Mutator, len(fcb.builders))
	for i := range fcb.builders {
		func(i int, root context.Context) {
			builder := fcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*FOODMENUMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, fcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, fcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
						if cerr, ok := isSQLConstraintError(err); ok {
							err = cerr
						}
					}
				}
				mutation.done = true
				if err != nil {
					return nil, err
				}
				id := specs[i].ID.Value.(int64)
				nodes[i].ID = int(id)
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, fcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (fcb *FOODMENUCreateBulk) SaveX(ctx context.Context) []*FOODMENU {
	v, err := fcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
